import React, { PureComponent } from "react";
import {
  getOne,
  getOneTech,
  getOneClothes,
} from "../../../store/actions/categoryListActions";
import { connect } from "react-redux";
import ProductPageAll from "./ProductPageAll";
import ProductPageClothes from "./ProductPageClothes";
import ProductPageTech from "./ProductPageTech";
import { Redirect } from "react-router-dom";

export class ProductPage extends PureComponent {
  render() {
    if (this.props.one) {
      return <ProductPageAll pathname={this.props.location.pathname} />;
    }

    if (this.props.oneTech) {
      return <ProductPageTech pathname={this.props.location.pathname} />;
    }

    if (this.props.oneClothes) {
      return <ProductPageClothes pathname={this.props.location.pathname} />;
    }
    return <Redirect to="/" />;
  }
}

const mapStateToProps = (state) => ({
  one: state.categoryListReducer.one,
  oneTech: state.categoryListReducer.oneTech,
  oneClothes: state.categoryListReducer.oneClothes,
});
export default connect(mapStateToProps, {
  getOne,
  getOneTech,
  getOneClothes,
})(ProductPage);
