import React, { PureComponent } from "react";
import styles from "./Categories.module.css";
import { connect } from "react-redux";
import { fetchDataList, getOne } from "../../store/actions/categoryListActions";
import { getCurrency } from "../../store/actions/myCurrencyActions";
import {
  addProduct,
  addQuantity,
  deleteProduct,
} from "../../store/actions/cartActions";
import USD from "../../images/USD.png";
import GBP from "../../images/GBP.png";
import AUD from "../../images/AUD.png";
import JPY from "../../images/JPY.png";
import RUB from "../../images/RUB.png";
import { toggleCartInMenu } from "../../store/actions/toggleCartInMenuActions";
import { toggleCurrencyMenu } from "../../store/actions/toggleCurrencyMenuActions";
import LinkAllToProductPage from "./LinksToProductPage/LinkAllToProductPage";
import AllToCart from "./ProductToCart/AllToCart";
import Spinner from "../Spinner/Spinner";

export class All extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cur: [USD, GBP, AUD, JPY, RUB],
      myCur: 0,
      addToCartObject: {},
    };
  }

  componentDidMount() {
    this.props.fetchDataList();
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
    if (this.props.openedCart) console.log("");
  }

  render() {
    return (
      <div
        className={
          this.props.openedCart || this.props.openedCurrencyList === true
            ? styles.wrapperOpenedCart
            : styles.container
        }
        onClick={() => {
          if (this.props.openedCart) {
            this.props.toggleCartInMenu(false);
          }
          if (this.props.openedCurrencyList) {
            this.props.toggleCurrencyMenu(false);
          }
        }}
      >
        <div className={styles.wrapper}>
          <h2 className={styles.header}>All</h2>
          <ul className={styles.list}>
            {this.props.dataList ? (
              this.props.dataList.map((item, index) => (
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
                      this.props.getOne(index + 1);
                  }}
                >
                  <LinkAllToProductPage
                    openedCart={this.props.openedCart}
                    openedCurrencyList={this.props.openedCurrencyList}
                    item={item}
                    currency={this.props.currency}
                    myCur={this.state.myCur}
                    index={index}
                  />

                  <AllToCart
                    item={item}
                    index={index}
                    cart={this.props.cart}
                    addProduct={this.props.addProduct}
                    addQuantity={this.props.addQuantity}
                    quantityArray={this.props.quantityArray}
                    addToCartObject={this.state.addToCartObject}
                    openedCart={this.props.openedCart}
                    openedCurrencyList={this.props.openedCurrencyList}
                    toggleCartInMenu={this.props.toggleCartInMenu}
                  />
                </li>
              ))
            ) : (
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
  dataList: state.categoryListReducer.dataList,
  cart: state.cartReducer.cart,
  currency: state.myCurrencyReducer.currency,
  openedCart: state.toggleCartInMenuReducer.openedCart,
  openedCurrencyList: state.toggleCurrencyListReducer.openedCurrencyList,
  quantityArray: state.cartReducer.quantityArray,
});

export default connect(mapStateToProps, {
  fetchDataList,
  getOne,
  getCurrency,
  toggleCartInMenu,
  toggleCurrencyMenu,
  addProduct,
  addQuantity,
  deleteProduct,
})(All);
