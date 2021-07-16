import React, { PureComponent } from "react";
import styles from "./Categories.module.css";
import { connect } from "react-redux";
import {
  fetchDataListClothes,
  getOneClothes,
} from "../../store/actions/categoryListActions";
import { getCurrency } from "../../store/actions/myCurrencyActions";
import { toggleCartInMenu } from "../../store/actions/toggleCartInMenuActions";
import { toggleCurrencyMenu } from "../../store/actions/toggleCurrencyMenuActions";
import { addProduct, addQuantity } from "../../store/actions/cartActions";
import USD from "../../images/USD.png";
import GBP from "../../images/GBP.png";
import AUD from "../../images/AUD.png";
import JPY from "../../images/JPY.png";
import RUB from "../../images/RUB.png";
import Spinner from "../Spinner/Spinner";
import LinkClothesToProductPage from "./LinksToProductPage/LinkClothesToProductPage";
import ClothesToCart from "./ProductToCart/ClothesToCart";

export class Clothes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cur: [USD, GBP, AUD, JPY, RUB],
      myCur: null,
      addToCartObject: {},
    };
  }

  componentDidMount() {
    this.props.fetchDataListClothes();
    this.props.getCurrency();

    this.setState({
      myCur: this.state.cur[this.props.currency],
    });
  }

  componentDidUpdate() {
    if (
      this.state.cur[this.props.currency] !== this.state.myCur &&
      this.state.myCur !== null
    ) {
      this.setState({
        myCur: this.state.cur[this.props.currency],
      });
    }
  }

  render() {
    return (
      <div
        className={
          this.props.openedCart || this.props.openedCurrencyList === true // used className instead of style prop
            ? styles.wrapperOpenedCart
            : styles.container
        }
        onClick={() => {
          if (this.props.openedCart) this.props.toggleCartInMenu(false);
          if (this.props.openedCurrencyList) {
            this.props.toggleCurrencyMenu(false);
          }
        }}
      >
        <div className={styles.wrapper}>
          <h2 className={styles.header}>Clothes</h2>
          <ul className={styles.list}>
            {this.props.dataListClothes ? (
              this.props.dataListClothes.map((item, index) => (
                <li
                  className={
                    item.inStock === false ? styles.outOfStock : styles.listItem
                  }
                  key={index}
                  onClick={() => {
                    if (
                      !this.props.openedCart &&
                      !this.props.openedCurrencyList
                    )
                      this.props.getOneClothes(index + 1);
                  }}
                >
                  <LinkClothesToProductPage
                    openedCart={this.props.openedCart}
                    openedCurrencyList={this.props.openedCurrencyList}
                    item={item}
                    currency={this.props.currency}
                    myCur={this.state.myCur}
                    index={index}
                  />

                  <ClothesToCart
                    item={item}
                    index={index}
                    cart={this.props.cart}
                    addProduct={this.props.addProduct}
                    addQuantity={this.props.addQuantity}
                    quantityArray={this.props.quantityArray}
                    addToCartObject={this.state.addToCartObject}
                    openedCart={this.props.openedCart}
                    openedCurrencyList={this.props.openedCurrencyList}
                  />
                </li>
              ))
            ) : (
              // used className instead of style prop
              <div className={styles.spinner}>
                <Spinner />
              </div>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataListClothes: state.categoryListReducer.dataListClothes,
  currency: state.myCurrencyReducer.currency,
  openedCart: state.toggleCartInMenuReducer.openedCart,
  openedCurrencyList: state.toggleCurrencyListReducer.openedCurrencyList,
  quantityArray: state.cartReducer.quantityArray,
  cart: state.cartReducer.cart,
});

export default connect(mapStateToProps, {
  fetchDataListClothes,
  getOneClothes,
  getCurrency,
  addProduct,
  addQuantity,
  toggleCartInMenu,
  toggleCurrencyMenu,
})(Clothes);
