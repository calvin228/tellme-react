import React, { Component } from "react";
import PageWrapper from "./PageWrapper";
import ForumLists from "./ForumLists";
import PageTitle from "./PageTitle";

export default class HomeForum extends Component {
    constructor() {
        super();
        this.state = {
            topics: []
        };
    }
    componentDidMount() {
        axios
            .get("/api/topics")
            .then(response => {
                this.setState({
                    topics: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <PageWrapper>
                <PageTitle title="Forum - TellMe"/>
                <ForumLists topics={this.state.topics}/>
            </PageWrapper>
        );
    }
}
