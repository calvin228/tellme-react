import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

const StoryItem = props => {
    return (
        <div className="media">
            <div className="media-left">
                <figure className="image is-64x64">
                    <img
                        className="is-small-radius"
                        src={
                            props.story.user
                                ? `/api/image/profile/${props.story.user.profile_image}`
                                : "https://bulma.io/images/placeholders/96x96.png"
                        }
                    />
                </figure>
            </div>
            <div className="media-content">
                <div className="content">
                    <Link
                        to={`/stories/${props.story ? props.story.slug : ""}`}
                    >
                        <strong style={{ color: "#3c3c3c" }}>
                            {props.story ? props.story.title : ""}
                        </strong>
                    </Link>
                    <br />
                    By : {props.story ? props.story.user.name : ""}
                </div>
            </div>
        </div>
    );
};


const ForumItem = props => {
    const { forum } = props
    return (
        <div className="media">
            <div className="media-left">
                <figure className="image is-64x64">
                    <img
                        className="is-small-radius"
                        src={
                            forum.user
                                ? `/api/image/profile/${forum.user.profile_image}`
                                : "https://bulma.io/images/placeholders/96x96.png"
                        }
                    />
                </figure>
            </div>
            <div className="media-content">
                <div className="content">
                    <Link
                        to={`/forum/${forum ? forum.id : ""}`}
                    >
                        <strong style={{ color: "#3c3c3c" }}>
                            {forum ? forum.subject : ""}
                        </strong>
                    </Link>
                    <br />
                    By : {forum ? forum.user.name : ""}
                </div>
            </div>
        </div>
    );
};

const MostVisited = props => {
    const { stories,forums } = props;
    return (
        <div className="column is-one-third">
            <div className="box">
                <div>
                    <h3 className="title is-4">Most Visited Stories</h3>
                    <hr />
                    {/* <div className="scrollable-medium"> */}
                    <div>
                        {_.orderBy(
                            stories,
                            ["visit_count"],
                            ["desc"]
                        ).slice(0,4).map(story => {
                            return <StoryItem key={story.id} story={story} />;
                        })}
                    </div>
                </div>
                <div className="mg-top-4">
                    <h3 className="title is-4">Most Visited Forums</h3>
                    <hr />
                    {/* <div className="scrollable-medium"> */}
                    <div>
                        {_.orderBy(
                            forums,
                            ["visit_count"],
                            ["desc"]
                        ).slice(0,4).map(forum => {
                            return <ForumItem key={forum.id} forum={forum} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MostVisited;
