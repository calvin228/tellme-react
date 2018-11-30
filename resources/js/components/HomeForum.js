import React, { Component } from "react";
import PageWrapper from "./PageWrapper";
import ForumLists from "./ForumLists";

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
                <ForumLists topics={this.state.topics}/>
            </PageWrapper>
        );
    }
}
