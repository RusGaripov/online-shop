import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Product extends Component {
  render() {
    const { one } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <h1>{one.title}</h1>
          <h2 style={{ fontSize: "16px", color: "#8B008B" }}>{one.time}</h2>
          <p>{this.shortText(one.text)}</p>
          <Link
            to={`/one
          
          /${one.id}`}
            className="btn btn-primary"
          >
            Подробнее
          </Link>
        </div>
      </div>
    );
  }
}

export default Product;
