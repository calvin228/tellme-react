import React, { Component } from "react";
import ListAuthorInfo from "./subcomponents/ListAuthorInfo";
import { Link } from "react-router-dom";
import Truncate from "./subcomponents/Truncate";

const ForumContent = props => {
    return (
        <div className="content">
            <div className="columns">
                <div className="column">
                    <p>
                        <strong>{props.topic.subject}</strong>
                        <br />
                    
                        <br />
                        {/* <Link
                            to={{
                                pathname: `/stories/${props.topic.id}`,
                                state: {
                                    story: props.story
                                }
                            }}
                            // to={}
                            className="has-text-primary"
                        >
                            See more...
                        </Link> */}
                    </p>
                </div>
                <div className="column is-one-fifth">
                    <p />
                </div>
            </div>
        </div>
    );
};

const ForumList = props => {
    console.log(props.topic);
    return (
        <div className="card is-small-radius is-margin-bottom-small">
            <div className="card-content padding-small">
                {/* <ListAuthorInfo
                    hasLike={false}
                    author={props.topic.user}
                    countComment={props.topic.comment.length}
                /> */}
                <ForumContent topic={props.topic} />
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
