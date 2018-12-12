import React, { Fragment, Component } from "react";
import ForumLists from "./ForumLists";
import StoryLists from "./subcomponents/StoryLists";

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <h3 className="subtitle has-text-grey">
                    <span>Story about "{this.props.search}"</span>
                </h3>
                <StoryLists stories={this.props.result.articles}/>
                <h3 className="subtitle has-text-grey">
                    <span>Forum about "{this.props.search}"</span>
                </h3>
                <ForumLists topics={this.props.result.topics} />
            </Fragment>

            
        );
    }
}
