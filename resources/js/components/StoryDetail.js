import React, { Component, Fragment } from "react";
import PageWrapper from "./PageWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comment = props => {
    const { comment, currentUser } = props;
    return (
        <Fragment>
            <div className="margin-small">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img
                                className="is-rounded"
                                src={`/api/image/profile/${
                                    comment.user.profile_image
                                }`}
                            />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p>
                            <strong>{comment.user.name}</strong>
                        </p>
                        <p className="has-text-grey">
                            {comment.user.description}
                        </p>
                    </div>
                    <div className="media-right">
                        {comment ? (
                            comment.user_id === currentUser.id ? (
                                <button
                                    className="delete"
                                    onClick={() =>
                                        props.deleteComment(comment.id)
                                    }
                                />
                            ) : (
                                ""
                            )
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <div className="card-border-bottom is-marginless">
                    <p className="break-line">
                        {props.comment.comment}
                        <br />
                    </p>
                </div>
            </div>
        </Fragment>
    );
};
export default class StoryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            comments: [],
            story: "",
            liked: "",
            current_user: {}
        };
        this.handleSaveComment = this.handleSaveComment.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleToggleLike = this.handleToggleLike.bind(this);
        this.handleDeleteArticle = this.handleDeleteArticle.bind(this);
        this.handleOnFocusTextArea = this.handleOnFocusTextArea.bind(this);
    }

    handleDeleteArticle() {
        axios
            .delete(`/api/articles/delete/${this.state.story.id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(response => {
                this.props.history.push("/");
            })
            .catch(error => {
                console.log(error);
            });
    }
    fetchComments() {
        axios
            .get(`/api/comments/${this.props.match.params.slug}`)
            .then(response => {
                this.setState({
                    comments: response.data
                });
            });
    }
    fetchStory() {
        axios
            .get(`/api/articles/${this.props.match.params.slug}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(response => {

                this.setState({
                    story: response.data.article[0],
                    current_user: response.data.current_user
                });
                this.fetchLike();
            });
    }
    handleResetField() {
        this.setState({
            comment: ""
        });
    }
    handleToggleLike() {
        if (this.state.liked) {
            axios
                .delete(`/api/dislike/${this.state.story.slug}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "jwtToken"
                        )}`
                    }
                })
                .then(response => {
                    this.setState({
                        liked: false
                    });
                });
        } else {
            const data = {
                story_id: this.state.story.id
            };
            axios
                .post(`/api/like/${this.state.story.slug}`, data, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "jwtToken"
                        )}`
                    }
                })
                .then(response => {
                    this.setState({
                        liked: true
                    });
                });
        }
    }
    fetchLike() {
        axios
            .get(`/api/like/${this.state.story.slug}/check`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(response => {
                this.setState({
                    liked: response.data
                });
            });
    }
    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    componentDidMount() {
        this.fetchComments();
        this.fetchStory();
    }
    handleSaveComment(event) {
        event.preventDefault();
        const data = {
            comment: this.state.comment,
            story_slug: this.props.match.params.slug,
            story_id: this.state.story.id
        };
        axios
            .post("/api/comment/create", data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(response => {
                this.fetchComments();
                this.handleResetField();
            });
    }
    handleDeleteComment(id) {
        axios
            .delete(`/api/comment/${id}/delete`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(this.fetchComments())
            .catch(error => console.log(error));
    }
    handleOnFocusTextArea() {
        document.getElementById("comment").focus();
    }
    render() {
        const { story, current_user } = this.state;
        return (
            <PageWrapper>
                <div className="card">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                    <img
                                        className="is-rounded"
                                        src={
                                            story
                                                ? `/api/image/profile/${
                                                      story.user.profile_image
                                                  }`
                                                : "https://bulma.io/images/placeholders/96x96.png"
                                        }
                                    />
                                </figure>
                            </div>
                            <div className="media-content">
                                <p>
                                    <strong>
                                        {story ? story.user.name : ""}
                                    </strong>
                                </p>
                                <p className="has-text-grey">
                                    {story ? story.user.description : ""}
                                </p>
                            </div>
                            <div className="media-right">
                                
                                {story ? (
                                    story.user_id === current_user.id ? (
                                        <button
                                            onClick={this.handleDeleteArticle}
                                            className="delete"
                                        />
                                    ) : (
                                        ""
                                    )
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="content">
                            <div className="columns">
                                <div className="column">
                                    <p className="break-line">
                                        <strong>{story.title}</strong>
                                        <br />
                                        {story.body}
                                        <br />
                                    </p>
                                </div>
                                <div className="column is-one-fifth">
                                    <p />
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <span
                            onClick={this.handleToggleLike}
                            className={`card-footer-item hover-grey card-border-bottom pointer ${
                                this.state.liked ? "has-text-primary" : ""
                            }`}
                        >
                            <FontAwesomeIcon
                                icon="thumbs-up"
                                style={{ marginRight: "5px" }}
                            />
                            Like
                        </span>
                        <span
                            onClick={this.handleOnFocusTextArea}
                            className="card-footer-item hover-grey card-border-bottom pointer"
                        >
                            <FontAwesomeIcon
                                icon="comment"
                                style={{ marginRight: "5px" }}
                            />
                            Comment
                        </span>
                    </footer>
                    <form onSubmit={this.handleSaveComment}>
                        <article className="media padding-small mg-top-2">
                            <div className="media-content">
                                <div className="field">
                                    <p className="control">
                                        <textarea
                                            id="comment"
                                            className="textarea"
                                            placeholder="Add a comment..."
                                            name="comment"
                                            onChange={this.handleFieldChange}
                                            value={this.state.comment}
                                        />
                                    </p>
                                </div>
                                <nav className="level">
                                    <div className="level-left" />
                                    <div className="level-right">
                                        <div className="level-item">
                                            <button
                                                type="submit"
                                                className="button is-primary"
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </article>
                    </form>
                    <div className="padding-small">
                        <p className="title is-3">All comments</p>
                        <hr className="is-marginless" />
                        {this.state.comments.map(comment => {
                            return (
                                <Comment
                                    className="is-padding-small"
                                    comment={comment}
                                    deleteComment={this.handleDeleteComment}
                                    currentUser={this.state.current_user}
                                />
                            );
                        })}
                    </div>
                </div>
            </PageWrapper>
        );
    }
}
