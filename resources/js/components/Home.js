import React, { Component } from "react";
import Header from "./subcomponents/Header";
import StoryLists from "./subcomponents/StoryLists";
import CreateStory from "./CreateStory";
import CreateForum from "./CreateForum";
import axios from "axios";
import PageWrapper from "./PageWrapper";
import PageTitle from "./PageTitle";
import { EditorState } from "draft-js";

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            isStoryModalActive: false,
            isForumModalActive: false,
            title: "",
            // body: EditorState.createEmpty(),
            body: "",
            category: "1",
            isLoading: false,
            user: "",
            subject: "",
            content: "",
            stories: []
        };

        this.handleToggleStoryModal = this.handleToggleStoryModal.bind(this);
        this.handleToggleForumModal = this.handleToggleForumModal.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateStory = this.handleCreateStory.bind(this);
        this.handleCreateForum = this.handleCreateForum.bind(this);
        this.handleFetchStories = this.handleFetchStories.bind(this);
        this.onChange = editorState => this.setState({ body: editorState });
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleToggleStoryModal() {
        this.setState({
            isStoryModalActive: !this.state.isStoryModalActive
        });
    }
    handleToggleForumModal() {
        this.setState({
            isForumModalActive: !this.state.isForumModalActive
        });
    }
    fetchCurrentUser() {
        axios
            .get("/api/user", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(response => {
                this.setState({
                    user: response.data.user
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    toggleLoading() {
        this.setState({
            isLoading: !this.state.isLoading
        });
    }
    handleFetchStories() {
        axios.get("/api/articles").then(response => {
            this.setState({
                stories: response.data
            });
        });
    }
    handleResetField() {
        this.setState({
            title: "",
            body: "",
            subject: "",
            content: "",
            category: "1"
        });
    }
    handleCreateStory(event) {
        const { title, body, category } = this.state;
        const data = {
            title,
            body,
            category_id: category
        };
        event.preventDefault();
        this.toggleLoading();
        axios
            .post("/api/articles", data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(response => {
                this.toggleLoading();
                this.handleFetchStories();
                this.handleToggleStoryModal();
                this.handleResetField();
            })
            .catch(error => {
                console.log(error.response);
                this.toggleLoading();
            });
    }

    handleCreatePost(topic_id) {
        const { content } = this.state;
        const data = {
            content
        };

        axios
            .post(`/api/post/${topic_id}/create`, data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(response => {
                this.handleToggleForumModal();
            })
            .catch(error => console.log(error));
    }
    handleCreateForum(event) {
        event.preventDefault();
        const { subject, category } = this.state;
        const data = {
            subject,
            category_id: category
        };
        this.toggleLoading();
        axios
            .post("/api/topic/create", data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(response => {
                this.toggleLoading();
                this.handleCreatePost(response.data.topic.id);                
            })
            .catch(error => console.log(error));
    }
    componentDidMount() {
        this.handleFetchStories();
        this.fetchCurrentUser();
    }
    render() {
        return (
            <PageWrapper stories={this.state.stories}>
                <PageTitle title="Home - TellMe"/>
                <Header
                    toggleStoryModal={this.handleToggleStoryModal}
                    toggleForumModal={this.handleToggleForumModal}
                />
                <CreateStory
                    createStory={this.handleCreateStory}
                    fieldChange={this.handleFieldChange}
                    isActiveStory={this.state.isStoryModalActive}
                    isLoading={this.state.isLoading}
                    toggleModal={this.handleToggleStoryModal}
                    user={this.state.user}
                    title={this.state.title}
                    body={this.state.body}
                    onchange={this.onChange}
                />
                <CreateForum
                    createForum={this.handleCreateForum}
                    fieldChange={this.handleFieldChange}
                    isActiveForum={this.state.isForumModalActive}
                    isLoading={this.state.isLoading}
                    toggleModal={this.handleToggleForumModal}
                    user={this.state.user}
                    title={this.state.title}
                    body={this.state.body}
                    onchange={this.onChange}
                />
                <h3 className="between-line has-text-grey">
                    <span>Newest Stories</span>
                </h3>
                <br />
                <StoryLists stories={this.state.stories} />
            </PageWrapper>
        );
    }
}
