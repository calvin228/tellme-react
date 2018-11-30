import React, { Component } from "react";
import axios from "axios";

export default class EditArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: "",
            category: "",
            categories: [],
            isLoading: false
        };
    }

    setInitialValue(){
        
    }
    componentWillMount() {
        axios
            .get(`/api/articles/${this.props.match.params.slug}`)
            .then(response => {
                this.setState({
                    title: response.data[0].title,
                    body: response.data[0].body,
                    category: response.data[0].category_id
                });
            });

        axios.get("/api/categories").then(response => {
            this.setState({
                categories: response.data
            });
        });
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
    handleUpdateArticle(event) {
        event.preventDefault();

        const article = { title: this.state.title, body: this.state.body };
        const { slug } = this.props.match.params;

        this.toggleLoading();

        axios
            .put(`/api/articles/edit/${slug}`, article)
            .then(response => {
                this.toggleLoading();
            })
            .catch(error => {
                console.log(error);
                this.toggleLoading();
            });
    }
    render() {
        return (
            <div className="form">
                <code>{JSON.stringify(this.state)}</code>
                <form onSubmit={this.handleUpdateArticle.bind(this)}>
                    <div className="field">
                        <div className="control">
                            <label className="label">Title</label>
                            <input
                                name="title"
                                className="input"
                                type="text"
                                placeholder="Danger input"
                                onChange={this.handleFieldChange.bind(this)}
                                value={this.state.title}
                            />
                        </div>
                    </div>
                    <div className="control">
                        <label className="label">Category</label>
                        <div className="select is-info">
                            <select
                                name="category"
                                onChange={this.handleFieldChange.bind(this)}
                            >
                                {this.state.categories.map(category => {
                                    return (
                                        <option value={category.id}>
                                            {category.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Body</label>
                            <textarea
                                name="body"
                                className="textarea"
                                placeholder="e.g. Hello world"
                                onChange={this.handleFieldChange.bind(this)}
                                value={this.state.body}
                            />
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button
                                type="submit"
                                className={`button is-link${
                                    this.state.isLoading ? ` is-loading` : ``
                                }`}
                                disabled={this.state.isLoading ? true : false}
                            >
                                Update
                            </button>
                        </div>
                        <div className="control">
                            {/* <button
                                type="submit"
                                onClick={this.handleSaveAsDraft.bind(this)}
                                className="button is-text"
                                disabled={this.state.isLoading ? true : false}
                            >
                                Save as draft
                            </button> */}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
