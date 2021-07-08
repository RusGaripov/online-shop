import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
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
import plusSquare from "../../../images/plusSquare.svg";
import minusSquare from "../../../images/minusSquare.svg";
import leftArrow from "../../../images/leftArrow.png";
import rightArrow from "../../../images/rightArrow.png";

export class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cur: [USD, GBP, AUD, JPY, RUB],
      activeFilters: [],
      counter: 1,
      counters: [1],
      cartContent: [],
      photoNumbers: [],
      num: [],
      totalSum: 1,
      myCur: null,
      checkQuantityArray: [],
    };
  }

  componentDidMount() {
    this.props.addProduct();
    this.setQuantitiesAndCurrency();
    this.recalculateTotalSum();
    this.setState({
      checkQuantityArray: this.state.quantityArray,
    });
    /* let newCounters = [];
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

    let numbers = [];
    for (let i = 0; i < this.props.cart.length; i++) {
      numbers.push(0);
    }
    this.setState({
      num: numbers,
      myCur: this.state.cur[this.props.currency],
    });*/
  }

  componentDidUpdate() {
    if (this.state.cur[this.props.currency] !== this.state.myCur) {
      this.recalculateTotalSum();
    }
    if (this.props.quantityArray !== this.state.checkQuantityArray) {
      this.recalculateTotalSum();
    }
  }

  setQuantitiesAndCurrency = () => {
    let newCounters = [];
    let numbers = [];
    for (let i = 0; i < this.props.cart.length; i++) {
      numbers.push(0);
      if (this.props.quantityArray && this.props.quantityArray[i]) {
        newCounters.push(this.props.quantityArray[i]);
      } else {
        newCounters.push(1);
      }
    }
    this.setState({
      counters: newCounters,
      cartContent: this.props.cart,
      num: numbers,
      myCur: this.state.cur[this.props.currency],
    });

    this.props.addQuantity(1, newCounters);
  };

  recalculateTotalSum = () => {
    let sum = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      if (this.state.counters[i] !== undefined) {
        sum +=
          this.props.cart[i].prices[this.props.currency].amount *
          this.state.counters[i];
      }
      if (this.state.counters[i] === undefined) {
        sum += this.props.cart[i].prices[this.props.currency].amount;
      }
    }
    this.setState({
      totalSum: sum,
    });
  };

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
                      <p>
                        {(
                          item.prices[this.props.currency].amount *
                          this.props.quantityArray[index]
                        ).toFixed(2)}
                      </p>
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
                                    {this.props.cart[index].attributes[
                                      indexValue
                                    ].type !== "swatch"
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
                        if (
                          !this.props.openedCart &&
                          !this.props.openedCurrencyList
                        ) {
                          this.props.deleteProduct(index);
                          this.setState({
                            cartContent: this.props.cart,
                          });
                        }
                      }}
                    >
                      Remove
                    </button>
                    <button
                      className={styles.buttonRemove}
                      onClick={() => {
                        if (
                          !this.props.openedCart &&
                          !this.props.openedCurrencyList
                        ) {
                          if (item.all === true) {
                            this.props.getOne(item.num);
                            this.props.getOneClothes({});
                            this.props.getOneTech({});
                          }
                          if (item.all === false && item.category === "tech") {
                            this.props.getOneTech(item.num);
                            this.props.getOneClothes({});
                            this.props.getOne({});
                          }
                          if (
                            item.all === false &&
                            item.category === "clothes"
                          ) {
                            this.props.getOneClothes(item.num);
                            this.props.getOneTech({});
                            this.props.getOne({});
                          }
                        }
                      }}
                    >
                      <Link
                        className={styles.mainContent__info__button_link}
                        to={
                          !this.props.openedCart &&
                          !this.props.openedCurrencyList
                            ? `/one/${
                                item.all !== true ? item.category : "all"
                              }/${item.num}`
                            : `/`
                        }
                      >
                        Description
                      </Link>
                    </button>
                  </div>
                  <div className={styles.rightCart}>
                    <div className={styles.plusMinus}>
                      <img
                        onClick={() => {
                          if (
                            !this.props.openedCart &&
                            !this.props.openedCurrencyList
                          ) {
                            let copyCounters = this.state.counters;
                            let newCount = copyCounters[index] + 1;
                            copyCounters.splice(index, 1);
                            copyCounters.splice(index, 0, newCount);
                            this.setState(
                              {
                                counters: copyCounters,
                                counter: newCount,
                              },
                              this.recalculateTotalSum()
                            );
                            this.props.addQuantity(index, copyCounters);
                          }
                        }}
                        className={styles.plusMinus__plus}
                        src={plusSquare}
                        alt="plus"
                      />
                      <p>{this.state.counters[index]}</p>
                      <img
                        onClick={() => {
                          if (
                            !this.props.openedCart &&
                            !this.props.openedCurrencyList
                          ) {
                            let copyCounters = this.state.counters;
                            if (this.state.counters[index] > 1) {
                              let newCount = this.state.counters[index] - 1;
                              copyCounters.splice(index, 1);
                              copyCounters.splice(index, 0, newCount);
                              this.setState(
                                {
                                  counters: copyCounters,
                                  counter: newCount,
                                },
                                this.recalculateTotalSum()
                              );
                              this.props.addQuantity(
                                index,
                                this.state.counters
                              );
                            }
                          }
                        }}
                        className={styles.plusMinus__minus}
                        src={minusSquare}
                        alt="minus"
                      />
                    </div>
                    <div>
                      <ul className={styles.photosSlider}>
                        <div className={styles.leftArrowBox}>
                          {this.props.cart[index].gallery.length > 1 ? (
                            <img
                              className={styles.leftArrow}
                              onClick={() => {
                                let newArr = [...this.state.num];
                                let a = this.state.num[index] - 1;
                                if (a >= 0) {
                                  newArr.splice(index, 1);
                                  newArr.splice(index, 0, a);
                                  this.setState({
                                    num: newArr,
                                  });
                                }
                              }}
                              src={leftArrow}
                              alt="left"
                            />
                          ) : null}
                        </div>

                        {this.props.cart[index].gallery.map(
                          (itemVal, itemInd) => (
                            <li className={styles.photo} key={itemInd}>
                              <img
                                className={
                                  this.state.num[index] === itemInd
                                    ? styles.gallery
                                    : styles.galleryInvisible
                                }
                                src={this.props.cart[index].gallery[itemInd]}
                                alt="gallery"
                              />
                            </li>
                          )
                        )}

                        <div className={styles.rightArrowBox}>
                          {this.props.cart[index].gallery.length > 1 ? (
                            <img
                              onClick={() => {
                                let newArr = [...this.state.num];
                                let a = this.state.num[index] + 1;
                                if (a < this.props.cart[index].gallery.length) {
                                  newArr.splice(index, 1);
                                  newArr.splice(index, 0, a);
                                  this.setState({
                                    num: newArr,
                                  });
                                }
                              }}
                              className={styles.rightArrow}
                              src={rightArrow}
                              alt="right"
                            />
                          ) : null}
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
