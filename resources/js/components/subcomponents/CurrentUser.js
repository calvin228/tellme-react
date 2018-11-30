import React from "react";

const CurrentUser = props => {
    const { user } = props; 
    return (
        <div className="media">
            <div className="media-left">
                <figure className="image is-48x48">
                    <img
                        className="is-rounded"
                        src={
                            user
                                ? `/api/image/profile/${user.profile_image}`
                                : "https://bulma.io/images/placeholders/96x96.png"
                        }
                    />
                </figure>
            </div>

            <div className="media-content">
                <p>
                    <strong>{user ? user.name : ""}</strong>
                </p>
                <p className="has-text-grey">
                    {user ? user.description : ""}
                </p>
            </div>
        </div>
    );
};

export default CurrentUser;
