import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AuthorInfo = props => {
    const { data, currentUser } = props;
    return data.hasOwnProperty("id") ? (
        <div className="media">
            <div className="media-left">
                <figure className="image is-48x48">
                    <img
                        className="is-rounded"
                        src={
                            data
                                ? `/api/image/profile/${
                                      data.user.profile_image
                                  }`
                                : "https://bulma.io/images/placeholders/96x96.png"
                        }
                    />
                </figure>
            </div>
            <div className="media-content">
                <p>
                    <strong>{data ? data.user.name : ""}</strong>
                </p>
                <p className="has-text-grey">
                    {data ? data.user.description : ""}
                </p>
            </div>
            <div className="media-right">
                {data.user_id === currentUser.id ? (
                    <Fragment>
                        <span
                            onClick={props.handleToggleModal}
                            className="hover-primary pointer tooltip"
                            data-tooltip="Edit"
                        >
                            <FontAwesomeIcon
                                icon="edit"
                                size="lg"
                            />
                        </span>
                        <span
                            className="hover-primary pointer tooltip"
                            data-tooltip="Delete"
                            onClick={props.handleDelete}
                        >
                            <FontAwesomeIcon icon="trash" size="lg" />
                        </span>
                    </Fragment>
                ) : (
                    ""
                )}
            </div>
        </div>
    ) : (
        ""
    );
};

export default AuthorInfo;
