import React, { Component, Fragment } from "react";
import Project from "./Project";
import axios from "axios";
const config = require("../config.json");

export default class Projects extends Component {
  state = {
    newproduct: null,
    products: [
      {
        id: 1,
        projectname: "Macdonalds Rework Online Menu",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        price: 5
      },
      {
        id: 2,
        projectname: "Pepsi Microsite Redesign",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        price: 10
      }
    ]
  };

  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    // try {
    //   const res = await axios.get(`${config.api.invokeUrl}/products`);
    //   const products = res.data;
    //   this.setState({ products: products });
    // } catch (err) {
    //   console.log(`An error has occurred: ${err}`);
    // }
  };

  componentDidMount = () => {
    this.fetchProducts();
  };

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Projects Available</h1>
            <p className="subtitle is-5">Lorem ipsum dolor sit amet</p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-12 is-parent  is-vertical">
                    {this.state.products && this.state.products.length > 0 ? (
                      this.state.products.map(project => (
                        <Project
                          name={project.projectname}
                          id={project.id}
                          key={project.id}
                          description={project.description}
                          price={project.price}
                        />
                      ))
                    ) : (
                      <div className="tile notification is-warning">
                        No projects available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
