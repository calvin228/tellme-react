import React, { Component, Fragment } from "react";
import PageWrapper from "./PageWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextAreaField from "./subcomponents/TextAreaField";
import CurrentUser from "./subcomponents/CurrentUser";
import ButtonCreate from "./subcomponents/ButtonCreate";
import InputField from "./subcomponents/InputField";
import ModalEdit from "./subcomponents/ModalEdit";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            comment: props.comment.comment,
            isLoading: false
        };

        this.handleToggleModal = this.handleToggleModal.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);

    }
    handleToggleModal() {
        this.setState({
            isActive: !this.state.isActive
        });
    }
    
    handleFieldChange(event) {
        this.setState({
            comment: event.target.value
        });
    }
    render() {
        const { comment, currentUser } = this.props;
        return (
            <Fragment>
                <ModalEdit
                    key={comment.id}
                    id={comment.id}
                    isActive={this.state.isActive}
                    toggleModal={this.handleToggleModal}
                    currentUser={currentUser}
                    content={this.state.comment}
                    fieldChange={this.handleFieldChange}
                    update={this.props.updateComment}
                />
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
                                    <Fragment>
                                        <span
                                            onClick={this.handleToggleModal}
                                            className="hover-primary pointer tooltip"
                                            data-tooltip="Edit"
                                        >
                                            <FontAwesomeIcon
                                                icon="edit"
                                                size="lg"
                                            />
                                        </span>
                                        <span
                                            onClick={() =>
                                                this.props.deleteComment(
                                                    comment.id
                                                )
                                            }
                                            className="hover-primary pointer tooltip"
                                            data-tooltip="Delete"
                                        >
                                            <FontAwesomeIcon
                                                icon="trash"
                                                size="lg"
                                            />
                                        </span>
                                    </Fragment>
                                ) : (
                                    ""
                                )
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="card-border-bottom is-marginless ">
                        <p className="break-line mg-btm-4">
                            {comment.comment}
                            <br />
                        </p>
                    </div>
                </div>
            </Fragment>
        );
    }
}


const ModalEditStory = props => {
    const { isActive, toggleModal, currentUser, title, body } = props;
    return (
        <div className={`modal${isActive ? " is-active" : ""}`}>
            <div className="modal-background" onClick={toggleModal} />
            <div className="modal-content">
                <div className="box">
                    <CurrentUser user={currentUser} />
                    <hr />
                    <form onSubmit={event => props.updateStory(event)}>
                        <InputField
                            label="Title"
                            type="text"
                            name="title"
                            onChange={props.fieldChange}
                            value={title}
                        />
                        <TextAreaField
                            label="Body"
                            name="body"
                            onChange={props.fieldChange}
                            value={body}
                        />
                        <ButtonCreate
                            type="submit"
                            name="Update"
                            color="is-primary"
                        />
                    </form>
                </div>
            </div>
            <button
                className="modal-close is-large"
                onClick={toggleModal}
                aria-label="close"
            />
        </div>
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
            current_user: {},
            title: "",
            body: "",
            isActive: false,
            isLoading: false
        };
        this.handleSaveComment = this.handleSaveComment.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleToggleLike = this.handleToggleLike.bind(this);
        this.handleDeleteArticle = this.handleDeleteArticle.bind(this);
        this.handleOnFocusTextArea = this.handleOnFocusTextArea.bind(this);
        this.handleUpdateComment = this.handleUpdateComment.bind(this);
        this.handleToggleModal = this.handleToggleModal.bind(this);
        this.handleUpdateStory = this.handleUpdateStory.bind(this);
        this.handleToggleLoading = this.handleToggleLoading.bind(this);
    }

    handleToggleLoading(){
        this.setState({
            isLoading: !this.state.isLoading
        })
    }
    handleUpdateStory(event) {
        event.preventDefault();
        const data = {
            title: this.state.title,
            body: this.state.body,
            _method: "PUT"
        };
        axios
            .post(
                `/api/articles/${this.props.match.params.slug}/update`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "jwtToken"
                        )}`
                    }
                }
            )
            .then(response => {
                this.fetchStory();
                this.handleToggleModal();
            })
            .catch(error => {
                console.log(error);
                this.handleToggleModal();
            });
    }
    handleToggleModal() {
        this.setState({
            isActive: !this.state.isActive
        });
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
                const { article } = response.data;
                this.setState({
                    story: article[0],
                    current_user: response.data.current_user,
                    title: article[0].title,
                    body: article[0].body
                });
                document.title = this.state.story.title + " - TellMe";
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
        this.handleToggleLoading();
        axios
            .post("/api/comment/create", data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(response => {
                this.handleToggleLoading();
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
    handleUpdateComment(event, id, comment, callback) {
        event.preventDefault();
        const data = {
            comment,
            _method: "PUT"
        };
        axios
            .post(`/api/comment/${id}/update`, data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(response => {
                this.fetchComments();
                callback();
            })
            .catch(error => {
                console.log(error);
                callback();
            });
    }
    handleOnFocusTextArea() {
        document.getElementById("comment").focus();
    }
    render() {
        const { story, current_user, isActive, title, body } = this.state;
        return (
            <PageWrapper>
                <ModalEditStory
                    isActive={isActive}
                    currentUser={current_user}
                    toggleModal={this.handleToggleModal}
                    title={title}
                    body={body}
                    fieldChange={this.handleFieldChange}
                    updateStory={this.handleUpdateStory}
                />
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
                                        <Fragment>
                                            <span
                                                onClick={this.handleToggleModal}
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
                                                onClick={
                                                    this.handleDeleteArticle
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon="trash"
                                                    size="lg"
                                                />
                                            </span>
                                        </Fragment>
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
                                <Fragment key={comment.id}>
                                    <Comment
                                        key={comment.id}
                                        className="is-padding-small"
                                        comment={comment}
                                        deleteComment={this.handleDeleteComment}
                                        currentUser={this.state.current_user}
                                        updateComment={this.handleUpdateComment}
                                    />
                                </Fragment>
                            );
                        })}
                    </div>
                </div>
            </PageWrapper>
        );
    }
}
