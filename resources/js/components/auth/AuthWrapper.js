import React from "react";

const AuthWrapper = (props) => {
    return (
        <section className="hero is-fullheight is-primary">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="column is-6 is-offset-3">
                        {props.children}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthWrapper;
