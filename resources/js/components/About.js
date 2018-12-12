import React, { Fragment } from "react";
import Navbar from "./Navbar";
import PageTitle from "./PageTitle";

const Person = props => {
    return (
        <div className="column">
            <div className="box">
                <h1 className="title has-text-centered is-4">{props.name}</h1>
                <figure className="image is-128x128 center">
                    <img className="is-rounded" src={props.imgLink} />
                </figure>
                <br />
                <h3 className="subtitle has-text-centered is-6">
                    {props.role}
                </h3>
            </div>
        </div>
    );
};

const About = () => {
    
    return (
        <Fragment>
            <PageTitle title="About - TellMe"/>
            <Navbar hideSearch={true}/>
            <section className="section has-background-light">
                <div className="container">
                    <h1 className="title has-text-centered">About Tellme</h1>
                    <div className="columns mg-top-6">
                        <Person
                            name="Audian Taslim"
                            role="Unknown"
                            imgLink="https://bulma.io/images/placeholders/128x128.png"
                        />
                        <Person
                            name="Calvin Octa Wijaya"
                            role="Unknown"
                            imgLink="https://bulma.io/images/placeholders/128x128.png"
                        />
                        <Person
                            name="Jovita"
                            role="Unknown"
                            imgLink="https://bulma.io/images/placeholders/128x128.png"
                        />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default About;
