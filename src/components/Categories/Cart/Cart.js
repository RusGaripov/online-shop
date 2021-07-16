import React, { PureComponent } from "react";
import {
  addProduct,
  addQuantity,
  deleteProduct,
} from "../../../store/actions/cartActions";
import { connect } from "react-redux";
import { getCurrency } from "../../../store/actions/myCurrencyActions";
import {
  getOne,
  getOneTech,
  getOneClothes,
} from "../../../store/actions/categoryListActions";
import { toggleCartInMenu } from "../../../store/actions/toggleCartInMenuActions";
import { toggleCurrencyMenu } from "../../../store/actions/toggleCurrencyMenuActions";
import styles from "./Cart.module.css";
import USD from "../../../images/USD.png";
import GBP from "../../../images/GBP.png";
import AUD from "../../../images/AUD.png";
import JPY from "../../../images/JPY.png";
import RUB from "../../../images/RUB.png";
import MainContentCart from "./MainContentCart";

export class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cur: [USD, GBP, AUD, JPY, RUB],
      totalSum: 0,
    };
  }

  totalSummed = (recalculatedSum) => {
    this.setState({
      totalSum: recalculatedSum,
    });
  };

  render() {
    return (
      <div
        className={
          this.props.openedCart || this.props.openedCurrencyList === true
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
          <h2>Cart</h2>
          <MainContentCart
            cur={this.state.cur}
            currency={this.props.currency}
            quantityArray={this.props.quantityArray}
            cart={this.props.cart}
            openedCart={this.props.openedCart}
            openedCurrencyList={this.props.openedCurrencyList}
            deleteProduct={this.props.deleteProduct}
            addQuantity={this.props.addQuantity}
            getOne={this.props.getOne}
            getOneClothes={this.props.getOneClothes}
            getOneTech={this.props.getOneTech}
            totalSummed={this.totalSummed}
          />

          <hr />
          <div className={styles.total}>
            <p className={styles.totalSum}>Total :</p>
            <div className={styles.totalAmount}>
              <img
                src={this.state.cur[this.props.currency]}
                alt="priceInfo"
              ></img>
              <p>{this.state.totalSum.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.myCurrencyReducer.currency,
  cart: state.cartReducer.cart,
  quantityArray: state.cartReducer.quantityArray,
  openedCart: state.toggleCartInMenuReducer.openedCart,
  openedCurrencyList: state.toggleCurrencyListReducer.openedCurrencyList,
  one: state.categoryListReducer.one,
  oneTech: state.categoryListReducer.oneTech,
  oneClothes: state.categoryListReducer.oneClothes,
});
export default connect(mapStateToProps, {
  addProduct,
  getCurrency,
  addQuantity,
  toggleCartInMenu,
  toggleCurrencyMenu,
  deleteProduct,
  getOne,
  getOneTech,
  getOneClothes,
})(Cart);
