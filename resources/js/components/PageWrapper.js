import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import MostVisited from "./subcomponents/MostVisited";
import _ from "lodash";
import SearchResult from "./SearchResult";

export default class PageWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            forums: [],
            search: "",
            result: "",
        };
        this.handleFetchStories = this.handleFetchStories.bind(this);
        this.handleFetchForums = this.handleFetchForums.bind(this);
        this.handleSearchResult = this.handleSearchResult.bind(this);
    }
    handleFetchStories() {
        axios.get("/api/articles").then(response => {
            this.setState({
                stories: response.data
            });
        });
    }
    handleFetchForums() {
        axios.get("/api/topics").then(response => {
            this.setState({
                forums: response.data
            });
        });
    }

    componentDidMount() {
        this.handleFetchStories();
        this.handleFetchForums();
    }
    handleSearchResult(value) {
        this.setState({
            search: value
        })
        if (value === "") {
            this.setState({
                result: ""
            });
        } else {
            axios.get(`/api/search?search=${value}`).then(response => {
                this.setState({
                    result: response.data
                });
            });
        }
    }
    render() {
        const searchResult = _.debounce(
            value => this.handleSearchResult(value),
            300
        );
        return (
            <Fragment>
                <Navbar handleSearchResult={searchResult} hideSearch={false}/>
                <section className="section reduce-mg-top-30">
                    <div className="columns is-reverse-mobile">
                        <MostVisited
                            stories={this.state.stories}
                            forums={this.state.forums}
                        />
                        <div className="column">
                            {this.state.result === "" ? (
                                this.props.children
                            ) : (
                                <SearchResult search={this.state.search} result={this.state.result} />
                            )}
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}
