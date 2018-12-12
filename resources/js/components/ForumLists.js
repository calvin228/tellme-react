import React, { Component } from "react";
import ListAuthorInfo from "./subcomponents/ListAuthorInfo";
import { Link } from "react-router-dom";
import PageTitle from "./PageTitle";

const ForumContent = props => {
    return (
        <div className="content">
            <p>
                <strong>{props.topic.subject}</strong>
                <br />
            </p>
        </div>
    );
};

const Footer = props => {
    return (
        <Link to={`/forum/${props.id}`}>
            <footer className="card-footer">
                <span className="card-footer-item hover-grey pointer">
                    View Topic
                </span>
            </footer>
        </Link>
    );
};
const ForumList = props => {
    return (
        <div className="card is-small-radius is-margin-bottom-small">
            <div className="card-content padding-none">
                <div className="padding-small">
                    <ListAuthorInfo
                        hasLike={false}
                        author={props.topic.user}
                        countComment={props.topic.post.length-1}
                    />
                    <ForumContent topic={props.topic} />
                </div>
                <Footer id={props.topic.id} />
            </div>
        </div>
    );
};

const ForumLists = props => {
    return (
        <div>
            <PageTitle title="Forum - TellMe"/>
            {props.topics.map(topic => {
                return <ForumList key={topic.id} topic={topic} />;
            })}
        </div>
    );
};

export default ForumLists;
