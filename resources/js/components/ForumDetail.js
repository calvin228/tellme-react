import React, { Component, Fragment } from "react";
import PageWrapper from "./PageWrapper";
import AuthorInfo from "./subcomponents/AuthorInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalEdit from "./subcomponents/ModalEdit";
import InputField from "./subcomponents/InputField";
import TextAreaField from "./subcomponents/TextAreaField";
import ButtonCreate from "./subcomponents/ButtonCreate";
import CurrentUser from "./subcomponents/CurrentUser";
import PageTitle from "./PageTitle";

const Content = props => {
    const { topic, post } = props;
    return (
        <div className="content">
            <div className="columns">
                <div className="column">
                    <p className="break-line">
                        <strong>{topic.subject}</strong>
                        <br />
                        {post.length > 0 ? post[0].content : ""}
                        <br />
                    </p>
                </div>
            </div>
        </div>
    );
};
const Footer = () => {
    const focusTextArea = () => document.getElementById("reply").focus();
    return (
        <footer className="card-footer">
            <span
                onClick={focusTextArea}
                className="card-footer-item hover-grey card-border-bottom pointer"
            >
                <FontAwesomeIcon
                    icon="comment"
                    style={{ marginRight: "5px" }}
                />
                Reply
            </span>
        </footer>
    );
};

const ReplyField = props => {
    return (
        <form onSubmit={props.saveReply}>
            <article className="media padding-small mg-top-2">
                <div className="media-content">
                    <div className="field">
                        <p className="control">
                            <textarea
                                id="reply"
                                className="textarea"
                                placeholder="Reply this topic..."
                                name="reply"
                                onChange={props.fieldChange}
                                value={props.reply}
                            />
                        </p>
                    </div>
                    <nav className="level">
                        <div className="level-left" />
                        <div className="level-right">
                            <div className="level-item">
                                <button
                                    type="submit"
                                    className={`button is-primary ${
                                        props.isLoading ? "is-loading" : ""
                                    }`}
                                    disabled={props.isLoading ? true : false}
                                >
                                    Reply
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </article>
        </form>
    );
};

class ReplyListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
            reply: props.reply.content
        };
        this.handleToggleModal = this.handleToggleModal.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }
    handleToggleModal() {
        this.setState({
            isActive: !this.state.isActive
        });
    }
    handleFieldChange(event) {
        this.setState({
            reply: event.target.value
        });
    }
    render() {
        const { reply, currentUser } = this.props;
        return (
            <Fragment>
                <ModalEdit
                    key={reply.id}
                    id={reply.id}
                    isActive={this.state.isActive}
                    toggleModal={this.handleToggleModal}
                    currentUser={currentUser}
                    content={this.state.reply}
                    fieldChange={this.handleFieldChange}
                    update={this.props.updateReply}
                />
                <div className="margin-small">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img
                                    className="is-rounded"
                                    src={`/api/image/profile/${
                                        reply.user.profile_image
                                    }`}
                                />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p>
                                <strong>{reply.user.name}</strong>
                            </p>
                            <p className="has-text-grey">
                                {reply.user.description}
                            </p>
                        </div>
                        <div className="media-right">
                            {reply ? (
                                reply.user_id === currentUser.id ? (
                                    <Fragment>
                                        <span
                                            onClick={this.handleToggleModal}
                                            className="hover-primary pointer tooltip"
                                            data-tooltip="Edit"
                                        >
                                            <FontAwesomeIcon
                                                icon="edit"
                                                size="lg"
                                            />
                                        </span>
                                        <span
                                            onClick={() =>
                                                this.props.handleDeleteReply(
                                                    reply.id
                                                )
                                            }
                                            className="hover-primary pointer tooltip"
                                            data-tooltip="Delete"
                                        >
                                            <FontAwesomeIcon
                                                icon="trash"
                                                size="lg"
                                            />
                                        </span>
                                    </Fragment>
                                ) : (
                                    ""
                                )
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="card-border-bottom is-marginless">
                        <p className="break-line">
                            {reply.content}
                            <br />
                        </p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const ReplyLists = props => {
    return (
        <div className="padding-small">
            <hr className="is-marginless" />
            {props.replies
                ? props.replies.slice(1).map(reply => {
                      return (
                          <ReplyListItem
                              key={reply.id}
                              reply={reply}
                              currentUser={props.currentUser}
                              updateReply={props.handleUpdateReply}
                              handleDeleteReply={props.handleDeleteReply}
                          />
                      );
                  })
                : ""}
        </div>
    );
};

const ModalEditForum = props => {
    const { isActive, toggleModal, currentUser, subject, content } = props;
    
    return (
        <div className={`modal${isActive ? " is-active" : ""}`}>
            <div className="modal-background" onClick={toggleModal} />
            <div className="modal-content">
                <div className="box">
                    <CurrentUser user={currentUser} />
                    <hr />
                    <form onSubmit={event => props.updateForum(event)}>
                        <InputField
                            label="Subject"
                            type="text"
                            name="subject"
                            onChange={props.fieldChange}
                            value={subject}
                        />
                        <TextAreaField
                            label="Content"
                            name="content"
                            onChange={props.fieldChange}
                            value={content}
                        />
                        <ButtonCreate
                            type="submit"
                            name="Update"
                            color="is-primary"
                        />
                    </form>
                </div>
            </div>
            <button
                className="modal-close is-large"
                onClick={toggleModal}
                aria-label="close"
            />
        </div>
    );
};

export default class ForumDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topic: {},
            reply: "",
            replies: [],
            current_user: {},
            isLoading: false,
            isActive: false,
            subject: "",
            content: ""
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSaveReply = this.handleSaveReply.bind(this);
        this.fetchReplyData = this.fetchReplyData.bind(this);
        this.handleDeleteReply = this.handleDeleteReply.bind(this);
        this.handleToggleLoading = this.handleToggleLoading.bind(this);
        this.handleToggleModal = this.handleToggleModal.bind(this);
        this.handleDeleteTopic = this.handleDeleteTopic.bind(this);
        this.handleUpdateReply = this.handleUpdateReply.bind(this);
        this.fetchUpdateTopic = this.fetchUpdateTopic.bind(this);
        this.fetchUpdatePost = this.fetchUpdatePost.bind(this);
        this.handleUpdateForum = this.handleUpdateForum.bind(this);
    }
    fetchUpdateTopic(data){
        axios
        .post(
            `/api/topics/${this.props.match.params.id}/update`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            }
        )
    }
    fetchUpdatePost(data){
        axios
        .post(
            `/api/post/${this.state.replies[0].id}/update`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            }
        )
        .then(response => {
            this.handleToggleModal(); 
            this.fetchReplyData();
            this.fetchTopicData(); 
        })
        .catch(error => {
            console.log(error);
        });
    }
    handleUpdateForum(event) {
        event.preventDefault();
        const topicData = {
            subject: this.state.subject,
            _method: "PUT"
        };
        const postData = {
            content: this.state.content,
            _method: "PUT"
        }
        this.fetchUpdateTopic(topicData);
        this.fetchUpdatePost(postData);
        
    }
    handleToggleLoading() {
        this.setState({
            isLoading: !this.state.isLoading
        });
    }
    handleToggleModal() {
        this.setState({
            isActive: !this.state.isActive
        });
    }
    componentDidMount() {

        this.fetchTopicData();
        this.fetchReplyData();
    }
    handleDeleteReply(id) {
        axios
            .delete(`/api/post/${id}/delete`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(this.fetchReplyData())
            .catch(error => console.log(error));
    }
    handleSaveReply(event) {
        event.preventDefault();
        const data = {
            content: this.state.reply
        };
        this.handleToggleLoading();
        axios
            .post(`/api/post/${this.props.match.params.id}/create`, data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(() => {
                this.handleToggleLoading();
                this.fetchReplyData();
                this.setState({
                    reply: ""
                });
            })
            .catch(error => {
                console.log(error);
                this.handleToggleLoading();
            });
    }
    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    fetchTopicData() {
        axios
            .get(`/api/topics/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    topic: response.data.topic[0],
                    subject: response.data.topic[0].subject
                });
                document.title = this.state.topic.subject + " - TellMe";
            })
            .catch(error => {
                console.log(error);
            });
    }
    fetchReplyData() {
        axios
            .get(`/api/posts/${this.props.match.params.id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(response => {
                this.setState({
                    replies: response.data.post,
                    content: response.data.post[0].content,
                    current_user: response.data.current_user
                });
            })
            .catch(error => console.log(error));
    }
    handleDeleteTopic() {
        axios
            .delete(`/api/topics/${this.props.match.params.id}/delete`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(this.props.history.push("/forum"))
            .catch(error => console.log(error));
    }
    handleUpdateReply(event, id, reply, callback) {
        event.preventDefault();
        const data = {
            content: reply,
            _method: "PUT"
        };
        axios
            .post(`/api/post/${id}/update`, data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(response => {
                this.fetchReplyData();
                callback();
            })
            .catch(error => {
                console.log(error);
                callback();
            });
    }
    render() {
        const { topic, subject, content, replies, current_user, isActive } = this.state;
        
        return (
            <PageWrapper>
                
                <ModalEditForum 
                    isActive={isActive}
                    currentUser={current_user}
                    toggleModal={this.handleToggleModal}
                    subject={subject}
                    content={content}
                    fieldChange={this.handleFieldChange}
                    updateForum={this.handleUpdateForum}
                />
                <div className="card">
                    <div className="card-content">
                        <AuthorInfo
                            data={topic}
                            currentUser={current_user}
                            handleDelete={this.handleDeleteTopic}
                            handleToggleModal={this.handleToggleModal}
                        />
                        <Content topic={topic} post={replies} />
                    </div>
                    <Footer />
                    <ReplyField
                        saveReply={this.handleSaveReply}
                        fieldChange={this.handleFieldChange}
                        isLoading={this.state.isLoading}
                        reply={this.state.reply}
                    />
                    <ReplyLists
                        replies={replies}
                        currentUser={current_user}
                        handleUpdateReply={this.handleUpdateReply}
                        handleDeleteReply={this.handleDeleteReply}
                    />
                </div>
            </PageWrapper>
        );
    }
}
