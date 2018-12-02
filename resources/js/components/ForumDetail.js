import React, { Component, Fragment } from "react";
import PageWrapper from "./PageWrapper";
import AuthorInfo from "./subcomponents/AuthorInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Content = props => {
    const { topic, post } = props;
    return (
        <div className="content">
            <div className="columns">
                <div className="column">
                    <p className="break-line">
                        <strong>{topic.subject}</strong>
                        <br />
                        {post.length > 0
                            ? post[0].content
                            : ""}
                        <br />
                    </p>
                </div>
            </div>
        </div>
    );
};
const Footer = () => {
    const focusTextArea = () => document.getElementById("reply").focus();
    return (
        <footer className="card-footer">
            <span
                onClick={focusTextArea}
                className="card-footer-item hover-grey card-border-bottom pointer"
            >
                <FontAwesomeIcon
                    icon="comment"
                    style={{ marginRight: "5px" }}
                />
                Reply
            </span>
        </footer>
    );
};

const ReplyField = props => {
    return (
        <form onSubmit={props.saveReply}>
            <article className="media padding-small mg-top-2">
                <div className="media-content">
                    <div className="field">
                        <p className="control">
                            <textarea
                                id="reply"
                                className="textarea"
                                placeholder="Reply this topic..."
                                name="reply"
                                onChange={props.fieldChange}
                                value={props.reply}
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
                                    Reply
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </article>
        </form>
    );
};

const ReplyListItem = props => {
    const { reply } = props;
    return (
        <Fragment>
            <div className="margin-small">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img
                                className="is-rounded"
                                src={`/api/image/profile/${
                                    reply.user.profile_image
                                }`}
                            />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p>
                            <strong>{reply.user.name}</strong>
                        </p>
                        <p className="has-text-grey">
                            {reply.user.description}
                        </p>
                    </div>
                    <div className="media-right">
                        {reply ? (
                            reply.user_id === reply.user.id ? (
                                <button
                                    className="delete"
                                    // onClick={() =>
                                    //     props.deleteComment(reply.id)
                                    // }
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
                        {reply.content}
                        <br />
                    </p>
                </div>
            </div>
        </Fragment>
    );
};
const ReplyLists = props => {
    return (
        <div className="padding-small">
            <hr className="is-marginless" />
            {props.replies ? props.replies.slice(1).map(reply => {
                return <ReplyListItem reply={reply}/>
            }) : ""}
        </div>
    );
};
export default class ForumDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topic: {},
            reply: "",
            replies: []
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSaveReply = this.handleSaveReply.bind(this);
    }
    componentDidMount() {
        this.fetchTopicData();
        this.fetchReplyData();
    }
    handleSaveReply(event) {
        event.preventDefault();
        const data = {
            content: this.state.reply
        };
        axios
            .post(`/api/post/${this.props.match.params.id}/create`, data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(this.fetchReplyData())
            .catch(error => console.log(error));
    }
    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    fetchTopicData() {
        axios
            .get(`/api/topics/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    topic: response.data.topic[0]
                });
            })
            .catch(error => {
                console.log(error);
            });
        
    }
    fetchReplyData(){
        axios.get(`/api/posts/${this.props.match.params.id}`)
        .then(response => {
            this.setState({
                replies: response.data
            })
        })
        .catch(error => console.log(error));
    }
    render() {
        const { topic, replies } = this.state;

        return (
            <PageWrapper>
                <div className="card">
                    <div className="card-content">
                        <AuthorInfo data={topic} />
                        <Content topic={topic} post={replies} />
                    </div>
                    <Footer />
                    <ReplyField
                        saveReply={this.handleSaveReply}
                        fieldChange={this.handleFieldChange}
                    />
                    <ReplyLists replies={replies} />
                </div>
            </PageWrapper>
        );
    }
}
