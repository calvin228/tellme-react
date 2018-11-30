import React, { Fragment } from "react";

const CreateStoryButton = (props) => {
    return (
        <div className="column">
            <button onClick={props.toggleStoryModal}  className="button is-primary is-medium is-fullwidth primary-button">
                Create Story
            </button>
        </div>
    );
};

const CreateForumButton = (props) => {
    return (
        <div className="column">
            <button onClick={props.toggleForumModal} className="button is-medium is-fullwidth is-secondary">
                Create Forum
            </button>
        </div>
    );
};

const Header = (props) => {
    return (
        <Fragment>
            <h3 className="title is-4 has-text-centered">Welcome to TellMe!</h3>
            <div className="columns" style={{"marginBottom": "0"}}>
                <CreateStoryButton toggleStoryModal={props.toggleStoryModal}/>
                <CreateForumButton toggleForumModal={props.toggleForumModal}/>
            </div>
        </Fragment>
    );
};

export default Header;
