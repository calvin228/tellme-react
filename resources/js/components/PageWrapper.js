import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import MostVisited from "./subcomponents/MostVisited";

export default class PageWrapper extends Component {
    constructor(props){
        super(props);
        this.state = {
            stories : []
        }
        this.handleFetchStories = this.handleFetchStories.bind(this);
    }
    handleFetchStories() {
        axios.get("/api/articles").then(response => {
            this.setState({
                stories: response.data
            });
        });
    }
    componentDidMount(){
        this.handleFetchStories();
    }
    render() {
        return (
            <Fragment>
                <Navbar />
                <section className="section reduce-mg-top-30">
                    <div className="columns is-reverse-mobile">
                        <MostVisited stories={this.state.stories} />
                        <div className="column">{this.props.children}</div>
                    </div>
                </section>
            </Fragment>
        );
    }
}
