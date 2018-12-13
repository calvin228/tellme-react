import React, { Fragment } from "react";
import Navbar from "./Navbar";
import PageTitle from "./PageTitle";
import logo from "../../../storage/app/public/profile_images/no-profile-image.png";

const Person = props => {
    return (
        <div className="column">
            <div className="box ">
                <figure className="image is-128x128 center mg-top-4">
                    <img className="is-rounded" src={props.imgLink} />
                </figure>
                <br />
                <h1 className="title has-text-centered is-4 mg-btm-4">{props.name}</h1>
            </div>
        </div>
    );
};

const About = () => {
    return (
        <Fragment>
            <PageTitle title="About - TellMe" />
            <Navbar hideSearch={true} />
            <section className="section has-background-light">
                <div className="container">
                    <h1 className="title has-text-centered">About Tellme</h1>
                    <div className="columns mg-top-6">
                        <Person
                            name="Audian Taslim"
                            imgLink={logo}
                        />
                        <Person
                            name="Calvin Octa Wijaya"
                            imgLink={logo}
                        />
                        <Person
                            name="Jovita"
                            imgLink={logo}
                        />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default About;
