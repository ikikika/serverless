import React, { Fragment } from "react";
import Jumbotron from "./Jumbotron";
import HomeContent from "./HomeContent";

export default function Home() {
  return (
    <Fragment>
      <Jumbotron />
      <div className="box cta">
        <p className="has-text-centered">
          <span className="tag is-dark">New</span> Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </div>
      <HomeContent />
    </Fragment>
  );
}
