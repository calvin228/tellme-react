import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const ListAuthorInfo = props => {
    const { author } = props;
    return (
        <div className="media">
            <div className="media-left">
                <figure className="image is-48x48">
                    <Link
                        className="text-black"
                        to={`/profile/${author ? author.slug : ""}`}
                    >
                        <img
                            className="is-rounded"
                            src={
                                author
                                    ? `/api/image/profile/${
                                          author.profile_image
                                      }`
                                    : "https://bulma.io/images/placeholders/96x96.png"
                            }
                        />
                    </Link>
                </figure>
            </div>

            <div className="media-content">
                <p>
                    <strong>
                        <Link
                            className="text-black"
                            to={`/profile/${author ? author.slug : ""}`}
                        >
                            {author ? author.name : ""}
                        </Link>
                    </strong>
                </p>
                <p className="has-text-grey">
                    {author ? author.description : ""}
                </p>
            </div>
            <div className="media-right">
                {props.hasLike ? (
                    <span className="mg-right-2">
                        <FontAwesomeIcon
                            icon="thumbs-up"
                            className="mg-right-1"
                        />
                        {props.countLike}
                    </span>
                ) : (
                    ""
                )}

                <span className="mg-right-2">
                    <FontAwesomeIcon icon="comment" className="mg-right-1" />
                    {props.countComment}
                </span>
            </div>
        </div>
    );
};

export default ListAuthorInfo;
