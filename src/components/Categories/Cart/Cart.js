import React, { Component } from "react";
import {
  addProduct,
  addQuantity,
  deleteProduct,
} from "../../../store/actions/cartActions";
import { connect } from "react-redux";
import { getCurrency } from "../../../store/actions/myCurrencyActions";
import { toggleCartInMenu } from "../../../store/actions/toggleCartInMenuActions";
import styles from "./Cart.module.css";
import USD from "../../../images/USD.png";
import GBP from "../../../images/GBP.png";
import AUD from "../../../images/AUD.png";
import JPY from "../../../images/JPY.png";
import RUB from "../../../images/RUB.png";
import plusSquare from "../../../images/plusSquare.svg";
import minusSquare from "../../../images/minusSquare.svg";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur: [USD, GBP, AUD, JPY, RUB],
      activeFilters: [],
      counter: 1,
      counters: [1],
      cartContent: [],
    };
  }
  componentDidMount() {
    this.props.addProduct();
    let newCounters = [];
    for (let i = 0; i < this.props.cart.length; i++) {
      if (this.props.quantityArray && this.props.quantityArray[i]) {
        newCounters.push(this.props.quantityArray[i]);
      } else {
        newCounters.push(1);
      }
    }
    this.setState({
      counters: newCounters,
      cartContent: this.props.cart,
    });
    this.props.addQuantity(1, newCounters);
  }

  render() {
    return (
      <div
        className={styles.wrapper}
        style={
          this.props.openedCart === true
            ? { backgroundColor: "rgba(57, 55, 72, 0.22)" }
            : null
        }
      >
        <h2>Cart</h2>

        <ul className={styles.mainContent}>
          {this.state.cartContent.map((item, index) => (
            <li key={index}>
              <hr />
              <div className={styles.mainContent__listItem}>
                <div className={styles.leftCart}>
                  <p className={styles.mainContent__listItem__info}>
                    {" "}
                    {item.name}
                  </p>
                  <div className={styles.priceInfo}>
                    <img
                      src={this.state.cur[this.props.currency]}
                      alt="priceInfo"
                    ></img>
                    <p>{item.prices[this.props.currency].amount}</p>
                  </div>
                  <ul className={styles.listOfAttributes}>
                    {this.props.cart[index].attributes &&
                      this.props.cart[index].attributes.map(
                        (itemValue, indexValue) => (
                          <li
                            key={indexValue}
                            className={
                              item.activeFilters[index] === indexValue
                                ? styles.attributeListItem__active
                                : styles.attributeListItem
                            }
                          >
                            <p className={styles.attributeName}>
                              {" "}
                              {itemValue.name}
                            </p>
                            <ul className={styles.attributeList}>
                              {itemValue.items.map((item, index2) => (
                                <li
                                  key={index2}
                                  className={
                                    this.props.cart[index].activeFilters[
                                      indexValue
                                    ] === index2
                                      ? styles.attributeListitem__active
                                      : styles.attributeListitem
                                  }
                                  style={
                                    this.props.cart[index].attributes[
                                      indexValue
                                    ].type === "swatch"
                                      ? {
                                          backgroundColor: item.value,
                                        }
                                      : null
                                  }
                                >
                                  {this.props.cart[index].attributes[indexValue]
                                    .type !== "swatch"
                                    ? item.value
                                    : null}
                                </li>
                              ))}
                            </ul>
                          </li>
                        )
                      )}
                  </ul>
                  <button
                    className={styles.buttonRemove}
                    onClick={() => {
                      this.props.deleteProduct(index);
                      this.setState({
                        cartContent: this.props.cart,
                      });
                    }}
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.rightCart}>
                  <div className={styles.plusMinus}>
                    <img
                      onClick={() => {
                        let copyCounters = this.state.counters;
                        let newCount = copyCounters[index] + 1;
                        copyCounters.splice(index, 1);
                        copyCounters.splice(index, 0, newCount);
                        this.setState({
                          counters: copyCounters,
                          counter: newCount,
                        });

                        this.props.addQuantity(index, copyCounters);
                      }}
                      className={styles.plusMinus__plus}
                      src={plusSquare}
                      alt="plus"
                    />
                    <p>{this.state.counters[index]}</p>
                    <img
                      onClick={() => {
                        let copyCounters = this.state.counters;
                        if (this.state.counters[index] > 1) {
                          let newCount = this.state.counters[index] - 1;
                          copyCounters.splice(index, 1);
                          copyCounters.splice(index, 0, newCount);
                          this.setState({
                            counter: newCount,
                          });
                          this.props.addQuantity(index, this.state.counters);
                        }
                      }}
                      className={styles.plusMinus__minus}
                      src={minusSquare}
                      alt="minus"
                    />
                  </div>
                  <img src={this.props.cart[index].gallery} alt="gallery" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.myCurrencyReducer.currency,
  cart: state.cartReducer.cart,
  quantityArray: state.cartReducer.quantityArray,
  openedCart: state.toggleCartInMenuReducer.openedCart,
});
export default connect(mapStateToProps, {
  addProduct,
  getCurrency,
  addQuantity,
  toggleCartInMenu,
  deleteProduct,
})(Cart);
