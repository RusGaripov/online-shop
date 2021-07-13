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
import { Link } from "react-router-dom";
import USD from "../../images/USD.png";
import GBP from "../../images/GBP.png";
import AUD from "../../images/AUD.png";
import JPY from "../../images/JPY.png";
import RUB from "../../images/RUB.png";
import cart from "../../images/cart.png";
import { toggleCartInMenu } from "../../store/actions/toggleCartInMenuActions";
import { toggleCurrencyMenu } from "../../store/actions/toggleCurrencyMenuActions";
import Spinner from "../Spinner/Spinner";

export class All extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cur: [USD, GBP, AUD, JPY, RUB],
      myCur: 0,
      myAmount: 1,
      addToCartObject: {},
    };
  }

  componentDidMount() {
    this.props.fetchDataList();
    this.props.getCurrency();

    this.setState({
      myCur: this.state.cur[this.props.currency],
      myAmount: this.props.currency,
    });
  }

  componentDidUpdate() {
    if (
      this.state.cur[this.props.currency] !== this.state.myCur &&
      this.state.myCur !== null
    ) {
      this.setState({
        myCur: this.state.cur[this.props.currency],
        myAmount: this.props.currency,
      });
    }
    if (this.props.openedCart) console.log("");
  }

  /* addToCart = (e) => {
    // this.props.addProduct(this.state.addToCartObject);
    if (this.props.quantityArray !== [1]) {
      let newArray = this.props.quantityArray;
      newArray.push(1);
      this.props.addQuantity(1, newArray);
    }
  };*/

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
                  <Link
                    className={styles.link}
                    value={index}
                    to={
                      !this.props.openedCart && !this.props.openedCurrencyList
                        ? `/one/all/${index + 1}`
                        : `/`
                    }
                  >
                    <img
                      className={styles.listItem__image}
                      src={item.gallery[0]}
                      alt="listItemImage"
                    />

                    {!item.inStock && (
                      <span className={styles.outOfStockInfo}>
                        Out of Stock
                      </span>
                    )}
                    <h3> {item.name}</h3>
                    <div className={styles.priceHeader}>
                      {this.props.currency ? (
                        <img
                          className={styles.currencySymbol}
                          src={this.state.myCur}
                          alt="currency"
                        ></img>
                      ) : (
                        <img
                          className={styles.currencySymbol}
                          src={USD}
                          alt="currency2"
                        ></img>
                      )}

                      <p className={styles.currency}>
                        {this.props.currency
                          ? item.prices[this.props.currency].amount
                          : item.prices[0].amount}
                      </p>
                    </div>
                  </Link>
                  {/*  {item.inStock && (
                    <Link
                      className={styles.addToCart}
                      to={
                        !this.props.openedCart && !this.props.openedCurrencyList
                          ? `/userCart`
                          : `/`
                      }
                      onClick={() => {
                        if (
                          !this.props.openedCart &&
                          !this.props.openedCurrencyList
                        ) {
                          console.log(item.name);
                        }
                        let a = [];
                        for (let i = 0; i < item.attributes.length; i++) {
                          a.push(0);
                        }
                        let count = 0;
                        let b;

                        for (let i = 0; i < this.props.cart.length; i++) {
                          if (
                            JSON.stringify(this.props.cart[i].name) ===
                            JSON.stringify(item.name)
                          ) {
                            console.log("ага");
                            count += 1;
                            b = this.props.quantityArray;
                            let c = this.props.quantityArray[i];
                            b.splice(i, 1);
                            console.log(this.props.quantityArray[i]);
                            b.splice(i, 0, c + 1);
                          }
                        }
                        if (count === 0) {
                          this.props.addProduct(
                            {
                              ...item, // object desctructuring
                              activeFilters: a,
                              quantity: 1,
                              all: false,
                              num: index + 1,
                            },
                            this.props.quantityArray
                          );
                          console.log(
                            this.state.addToCartObject,
                            this.props.cart,
                            this.props.quantityArray
                          );
                          this.props.addQuantity(1, this.props.quantityArray, {
                            ...item, // object desctructuring
                            activeFilters: a,
                            quantity: 1,
                            all: false,
                            num: index + 1,
                          });
                        }
                        if (count === 1) {
                          this.props.addQuantity(
                            1,
                            b,
                            this.state.addToCartObject
                          );
                        }
                      }}
                    >
                      Add to Cart
                    </Link>
                    )}*/}
                  {item.inStock && (
                    <Link
                      to={
                        !this.props.openedCart && !this.props.openedCurrencyList
                          ? `/userCart`
                          : `/`
                      }
                      //  className={styles.addToCart}
                      onClick={() => {
                        if (
                          !this.props.openedCart &&
                          !this.props.openedCurrencyList
                        ) {
                          let a = [];
                          for (let i = 0; i < item.attributes.length; i++) {
                            a.push(0);
                          }

                          /*    this.props.addProduct(
                            {
                              ...item, // object desctructuring
                              activeFilters: a,
                              quantity: 1,
                              all: false,
                              num: index + 1,
                            }
                            //  this.props.quantityArray
                          );*/

                          /*     if (this.props.quantityArray !== [1]) {
                            console.log(item, index, this.props.cart);
                            let newArray = this.props.quantityArray;
                            newArray.push(1);
                            this.props.addQuantity(1, newArray);
                          }*/

                          let count = 0;
                          let b;

                          for (let i = 0; i < this.props.cart.length; i++) {
                            if (
                              JSON.stringify(this.props.cart[i].name) ===
                              JSON.stringify(item.name)
                            ) {
                              console.log("ага");
                              count += 1;
                              b = this.props.quantityArray;
                              let c = this.props.quantityArray[i];
                              b.splice(i, 1);
                              console.log(this.props.quantityArray[i]);
                              b.splice(i, 0, c + 1);
                            }
                          }
                          if (count === 0) {
                            this.props.addProduct(
                              {
                                ...item, // object desctructuring
                                activeFilters: a,
                                quantity: 1,
                                all: false,
                                num: index + 1,
                              },
                              this.props.quantityArray
                            );
                            console.log(
                              this.state.addToCartObject,
                              this.props.cart,
                              this.props.quantityArray
                            );
                            this.props.addQuantity(
                              1,
                              this.props.quantityArray,
                              {
                                ...item, // object desctructuring
                                activeFilters: a,
                                quantity: 1,
                                all: false,
                                num: index + 1,
                              }
                            );
                          }
                          if (count === 1) {
                            this.props.addQuantity(
                              1,
                              b,
                              this.state.addToCartObject
                            );
                          }
                        }
                      }}
                    >
                      <img src={cart} alt="cart" className={styles.cart} />
                    </Link>
                  )}
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
  dataList: state.categoryListReducer.dataList,
  cart: state.cartReducer.cart,
  one: state.categoryListReducer.one,
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
