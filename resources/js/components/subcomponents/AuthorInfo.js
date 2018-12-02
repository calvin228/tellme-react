import React from "react";

const AuthorInfo = props => {
    const { data } = props;
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
                {/* EDIT THIS ONE */}
                {data.user_id === data.user.id ? (
                    <button
                        // onClick={props.handleDelete}
                        className="delete"
                    >
                        {/* Delete */}
                    </button>
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
