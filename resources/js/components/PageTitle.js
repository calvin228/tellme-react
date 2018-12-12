import React, { Component, Fragment } from "react";

export default class PageTitle extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        document.title = this.props.title;
    }
    render() {
        return <Fragment />;
    }
}
