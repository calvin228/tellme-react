import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            search: ""
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        // this.handleSearchResult = this.handleSearchResult.bind(this)
    }
    handleFieldChange(event){
        this.setState({
            search : event.target.value
        })
        this.props.handleSearchResult(event.target.value);
    }
    render() {

        return (
            <div className="navbar-item">
                <span style={{ display: "flex" }}>
                    <FontAwesomeIcon
                        icon="search"
                        size="2x"
                        className="mg-right-2"
                    />
                    <div className="field">
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="search"
                                onChange={this.handleFieldChange}
                                placeholder="Search..."
                                value={this.state.search}
                               
                            />
                        </div>
                    </div>
                </span>
            </div>
        );
    }
}
