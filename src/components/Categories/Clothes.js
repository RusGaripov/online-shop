import React, { PureComponent } from "react";
import styles from "./Categories.module.css";
import { connect } from "react-redux";
import {
  fetchDataList,
  fetchDataListClothes,
  getOne,
  getOneClothes,
} from "../../store/actions/categoryListActions";
import { getCurrency } from "../../store/actions/myCurrencyActions";
import { toggleCartInMenu } from "../../store/actions/toggleCartInMenuActions";
import { toggleCurrencyMenu } from "../../store/actions/toggleCurrencyMenuActions";
import { addProduct, addQuantity } from "../../store/actions/cartActions";
import { Link } from "react-router-dom";
import USD from "../../images/USD.png";
import GBP from "../../images/GBP.png";
import AUD from "../../images/AUD.png";
import JPY from "../../images/JPY.png";
import RUB from "../../images/RUB.png";
import cart from "../../images/cart.png";

import Spinner from "../Spinner/Spinner";

export class Clothes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cur: [USD, GBP, AUD, JPY, RUB],
      myCur: null,
      myAmount: 1,
      arr: [],
      idS: [],
    };
  }

  componentDidMount() {
    this.props.fetchDataList();
    this.props.fetchDataListClothes();
    this.props.getCurrency();
    /*Filtering data by category */
    /*  if (this.props.dataList) {
      for (let i = 0; i < this.props.dataList.length; i++) {
        if (this.props.dataList[i].category === "clothes") {
          this.state.arr.push(this.props.dataList[i]);
          this.state.idS.push(i + 1);
        }
      }
    }*/
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
  }

  /*addToCart = () => {
    this.props.addProduct(this.state.addToCartObject);
    if (this.props.quantityArray !== [1]) {
      let newArray = this.props.quantityArray;
      newArray.push(1);
      this.props.addQuantity(1, newArray);
    }
  };*/
  /*Go to ProductPage*/
  // handleClick = (e) => {
  // const id = e.target.baseURI.slice(26);
  //  this.props.getOne(id);
  //this.props.getOneClothes(id);
  //};

  render() {
    console.log(this.props);
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
                  // onClick={this.handleClick}
                  onClick={() => {
                    if (
                      !this.props.openedCart &&
                      !this.props.openedCurrencyList
                    )
                      this.props.getOneClothes(index + 1);
                  }}
                >
                  <Link
                    className={styles.link}
                    value={index}
                    //   to={`/one/${item.name}}`}
                    to={
                      !this.props.openedCart && !this.props.openedCurrencyList
                        ? `/one/${item.category}/${index + 1}`
                        : `/`
                    }
                  >
                    <img
                      className={styles.listItem__image}
                      src={item.gallery[0]}
                      alt="image3"
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
                          alt="currencySymbol"
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
                      to={
                        !this.props.openedCart && !this.props.openedCurrencyList
                          ? `/userCart`
                          : `/`
                      }
                      className={styles.addToCart}
                      onClick={() => {
                        if (
                          !this.props.openedCart &&
                          !this.props.openedCurrencyList
                        ) {
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
  dataListClothes: state.categoryListReducer.dataListClothes,
  one: state.categoryListReducer.one,
  oneClothes: state.categoryListReducer.oneClothes,
  currency: state.myCurrencyReducer.currency,
  openedCart: state.toggleCartInMenuReducer.openedCart,
  openedCurrencyList: state.toggleCurrencyListReducer.openedCurrencyList,
  quantityArray: state.cartReducer.quantityArray,
  cart: state.cartReducer.cart,
});

export default connect(mapStateToProps, {
  fetchDataList,
  fetchDataListClothes,
  getOne,
  getOneClothes,
  getCurrency,
  addProduct,
  addQuantity,
  toggleCartInMenu,
  toggleCurrencyMenu,
})(Clothes);
