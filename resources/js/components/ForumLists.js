import React, { Component } from "react";
import ListAuthorInfo from "./subcomponents/ListAuthorInfo";
import { Link } from "react-router-dom";

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

const Footer = () => {
    return (
        <footer className="card-footer">
            <span className="card-footer-item">
                <p>View Topic</p>
            </span>
        </footer>
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
                        countComment={0}
                    />
                    <ForumContent topic={props.topic} />
                </div>
                <Footer />
                
            </div>
        </div>
    );
};

const ForumLists = props => {
    return (
        <div>
            {props.topics.map(topic => {
                return <ForumList key={topic.id} topic={topic} />;
            })}
        </div>
    );
};

export default ForumLists;
