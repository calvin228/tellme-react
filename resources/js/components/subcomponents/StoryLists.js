import React, { Component } from "react";
import ListAuthorInfo from "./ListAuthorInfo";
import { Link } from "react-router-dom";
import Truncate from "./Truncate";

const StoryContent = props => {
    return (
        <div className="content">
            <div className="columns">
                <div className="column">
                    <p>
                        <strong>{props.story.title}</strong>
                        <br />
                        <Truncate>{props.story.body}</Truncate>
                        <br />
                        <Link
                            to={{
                                pathname: `/stories/${props.story.slug}`,
                                state: {
                                    story: props.story
                                }
                            }}
                            // to={}
                            className="has-text-primary"
                        >
                            See more...
                        </Link>
                    </p>
                </div>
                <div className="column is-one-fifth">
                    <p />
                </div>
            </div>
        </div>
    );
};

const StoryList = props => {
    return (
        <div className="card is-small-radius is-margin-bottom-small">
            <div className="card-content padding-small">
                <ListAuthorInfo
                    hasLike={true}
                    author={props.story.user}
                    countComment={props.story.comment.length}
                    countLike={props.story.like.length}
                />
                <StoryContent story={props.story} />
            </div>
        </div>
    );
};

const StoryLists = props => {
    return (
        <div>
            {props.stories.map(story => {
                return <StoryList key={story.slug} story={story} />;
            })}
        </div>
    );
};

export default StoryLists;
