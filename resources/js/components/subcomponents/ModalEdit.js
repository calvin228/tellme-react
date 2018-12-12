import React from "react";
import CurrentUser from "./CurrentUser";
import TextAreaField from "./TextAreaField";
import ButtonCreate from "./ButtonCreate";

const ModalEdit = props => {
    const { isActive, toggleModal, currentUser, content, id } = props;

    return (
        <div className={`modal${isActive ? " is-active" : ""}`}>
            <div className="modal-background" onClick={toggleModal} />
            <div className="modal-content">
                <div className="box">
                    <CurrentUser user={currentUser} />
                    <hr />
                    <form
                        onSubmit={event =>
                            props.update(event, id, content, toggleModal)
                        }
                    >
                        <TextAreaField
                            label="Comment"
                            name="comment"
                            onChange={props.fieldChange}
                            value={content}
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

export default ModalEdit;