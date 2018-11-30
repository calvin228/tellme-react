import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Title = props => {
    return (
        <div className="field">
            <div className="control">
                <label className="label">Title</label>
                <input
                    name="title"
                    className="input"
                    type="text"
                    placeholder="Danger input"
                    onChange={props.onChangeField}
                />
            </div>
        </div>
    );
};

const Body = props => {
    return (
        <div className="control">
            <label className="label">Body</label>
            <textarea
                name="body"
                className="textarea"
                placeholder="e.g. Hello world"
                onChange={props.onChangeField}
            />
        </div>
    );
};

export default class CreateArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: "",
            category: "1",
            categories: [],
            isLoading: false,
            cover_img_name: "..."
        };
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    toggleLoading() {
        this.setState({
            isLoading: !this.state.isLoading
        });
    }

    handleDeleteArticle() {
        const id = 26;
        axios
            .delete(`/api/articles/delete/${id}`)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
    handleCreateArticle(event) {
        event.preventDefault();

        const { title, body, category } = this.state;

        let data = new FormData();
        data.append('title', title);
        data.append('body', body);
        data.append('category_id', category);
        data.append('cover_image', this.cover_image);

        this.toggleLoading();
        axios
            .post("/api/articles", data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(response => {
                this.toggleLoading();
                this.props.history.push("/articles");
            })
            .catch(error => {
                console.log(error.response);
                this.toggleLoading();
            });
    }
    handleSaveAsDraft(event) {
        event.preventDefault();

        const articles = {
            title: this.state.title,
            body: this.state.body,
            category: this.state.category
        };

        axios
            .post("/api/articles/draft/create", articles)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleImageUpload(event) {
        this.cover_image = event.target.files[0];
        this.setState({
            cover_img_name: this.cover_image.size < 2000000 ? this.cover_image.name : "File size too large"
        })
    }

    componentDidMount() {
        axios.get("/api/categories").then(response => {
            this.setState({
                categories: response.data
            });
        });
    }
    render() {
        return (
            <section className="section">
                <div className="form">
                    {/*<code>{JSON.stringify(this.state)}</code>*/}
                    <form
                        encType="multipart/form-data"
                        onSubmit={this.handleCreateArticle.bind(this)}
                        autoComplete="off"
                    >
                        <div className="field">
                            <label className="label">Cover image</label>
                            <div className="file has-name">
                                <label className="file-label">
                                    <input
                                        className="file-input"
                                        type="file"
                                        name="cover_image"
                                        accept="image/*"
                                        onChange={this.handleImageUpload}
                                    />
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <FontAwesomeIcon icon="upload" />
                                        </span>
                                        <span className="file-label">
                                            Choose an image...
                                        </span>
                                    </span>
                                    <span className="file-name">
                                        {this.state.cover_img_name}
                                    </span>
                                </label>
                            </div>
                            <Title
                                onChangeField={this.handleFieldChange.bind(
                                    this
                                )}
                            />
                            <div className="control">
                                <label className="label">Category</label>
                                <div className="select is-info">
                                    <select
                                        name="category"
                                        onChange={this.handleFieldChange.bind(
                                            this
                                        )}
                                    >
                                        {this.state.categories.map(category => {
                                            return (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <Body
                                onChangeField={this.handleFieldChange.bind(
                                    this
                                )}
                            />
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button
                                    type="submit"
                                    className={`button is-link${
                                        this.state.isLoading
                                            ? ` is-loading`
                                            : ``
                                    }`}
                                    disabled={
                                        this.state.isLoading ? true : false
                                    }
                                >
                                    Create
                                </button>
                            </div>
                            <div className="control">
                                <button
                                    type="submit"
                                    onClick={this.handleSaveAsDraft.bind(this)}
                                    className="button is-text"
                                    disabled={
                                        this.state.isLoading ? true : false
                                    }
                                >
                                    Save as draft
                                </button>
                            </div>
                            <div className="control">
                                <button
                                    type="submit"
                                    onClick={this.handleDeleteArticle.bind(
                                        this
                                    )}
                                    className="button is-text"
                                    disabled={
                                        this.state.isLoading ? true : false
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}
