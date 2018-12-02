import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

const MostVisitedItem = props => {
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
const MostVisited = props => {
    const { stories } = props;
    return (
        <div className="column is-one-third">
            <div className="box">
                <div>
                    <h3 className="title is-4">Most Visited Stories</h3>
                    <hr />
                    {/* <div className="scrollable-medium"> */}
                    <div>
                        {_.orderBy(
                            stories.slice(0, 4),
                            ["visit_count"],
                            ["desc"]
                        ).map(story => {
                            return <MostVisitedItem key={story.id} story={story} />;
                        })}
                    </div>
                </div>
                <div className="mg-top-4">
                    <h3 className="title is-4">Most Visited Forums</h3>
                    <hr />
                    {/* <div className="scrollable-medium"> */}
                    <div>
                        {_.orderBy(
                            stories.slice(0, 4),
                            ["visit_count"],
                            ["desc"]
                        ).map(story => {
                            return <MostVisitedItem key={story.id} story={story} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MostVisited;
