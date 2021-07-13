import React, { PureComponent } from "react";
import styles from "./ProductPage.module.css";
import { Link } from "react-router-dom";
import {
  getOne,
  getOneTech,
  getOneClothes,
  fetchDataList,
} from "../../../store/actions/categoryListActions";
import { getCurrency } from "../../../store/actions/myCurrencyActions";
import { addProduct, addQuantity } from "../../../store/actions/cartActions";
import { toggleCartInMenu } from "../../../store/actions/toggleCartInMenuActions";
import { toggleCurrencyMenu } from "../../../store/actions/toggleCurrencyMenuActions";
import { connect } from "react-redux";
import USD from "../../../images/USD.png";
import GBP from "../../../images/GBP.png";
import AUD from "../../../images/AUD.png";
import JPY from "../../../images/JPY.png";
import RUB from "../../../images/RUB.png";
import Spinner from "../../Spinner/Spinner";

export class ProductPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      cur: [USD, GBP, AUD, JPY, RUB],
      myCur: null,
      myAmount: 1,
      num: 1,
      activeFilter: 0,
      activeFilters: [],
      attribute: "",
      attributesId: [],
      addToCartObject: {},
      currentPhoto: 0,
      counters: [],
    };
  }
  componentDidMount() {
    this.props.getCurrency();
    this.props.addProduct();
    let arr1 = [];
    let attrId = [];
    let activeFilt = [];

    if (this.props.one) {
      for (let i = 0; i < this.props.one.attributes.length; i++) {
        attrId.push(this.props.one.attributes[i].id);
        activeFilt.push(0);
      }
      this.setState({
        arr: arr1,
        cur: [USD, GBP, AUD, JPY, RUB],
        myCur: null,
        myAmount: null,
        attributesId: attrId,
        activeFilters: activeFilt,
        number: null,
        addToCartObject: {
          ...this.props.one, //object desctructuring
          num: this.state.number,
          activeFilters: activeFilt,
          quantity: 1,
          all: true,
        },
      });
    }

    this.defineNumberOfProduct();
  }

  componentDidUpdate() {
    if (this.state.cur[this.props.currency] !== this.state.myCur) {
      this.props.getCurrency();
      this.setState({
        myCur: this.state.cur[this.props.currency],
        myAmount: this.props.currency,
      });
    }
  }
  /* addToCart = () => {
    if (!this.props.openedCart) {
      this.props.addProduct(
        this.state.addToCartObject,
        this.props.quantityArray
      );
    }
  };*/
  addToCart = () => {
    let count = 0;
    let b;
    if (!this.props.openedCart) {
      for (let i = 0; i < this.props.cart.length; i++) {
        if (
          JSON.stringify(this.props.cart[i].name) ===
            JSON.stringify(this.state.addToCartObject.name) &&
          JSON.stringify(this.props.cart[i].activeFilters) ===
            JSON.stringify(this.state.addToCartObject.activeFilters)
        ) {
          console.log(
            "ага",
            this.props.cart[i].activeFilters,
            this.state.addToCartObject.activeFilters
          );
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
          this.state.addToCartObject,
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
          this.state.addToCartObject
        );
      }
      if (count === 1) {
        this.props.addQuantity(1, b, this.state.addToCartObject);
      }
    }
  };
  notAddToCart = () => {
    console.log("please,close cart overlay ");
  };

  choosePhoto = (e) => {
    this.setState({
      currentPhoto: e.target.value,
    });
  };

  defineNumberOfProduct = () => {
    let a = this.props.pathname.toString();

    let count = 0;
    let arr1 = [];
    let attrId = [];
    let activeFilt = [];
    if (this.props.one) {
      for (let i = 0; i < this.props.one.attributes.length; i++) {
        attrId.push(this.props.one.attributes[i].id);
        activeFilt.push(0);
      }
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i] === "/") {
        count += 1;
      }
      if (count === 3) {
        let b = a.slice(i, a.length);
        if (this.props.one) {
          this.setState({
            arr: arr1,
            attributesId: attrId,
            activeFilters: activeFilt,
            number: Number.parseInt(b),
            addToCartObject: {
              num: Number.parseInt(b),
              ...this.props.one, //object desctructuring
              activeFilters: activeFilt,
              quantity: 1,
              all: true,
            },
          });
        }
      }
    }
  };

  render() {
    console.log(this.props.quantityArray, this.props.one);
    if (this.props.one) {
      return (
        <div
          className={
            this.props.openedCart || this.props.openedCurrencyList === true // used className instead of style prop
              ? styles.wrapperOpenedCart
              : styles.containerBox
          }
          onClick={() => {
            if (this.props.openedCart) this.props.toggleCartInMenu(false);
            if (this.props.openedCurrencyList) {
              this.props.toggleCurrencyMenu(false);
            }
          }}
        >
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <ul className={styles.gallery}>
                {this.props.one.gallery.map((item, index) => (
                  <li
                    key={index}
                    value={index}
                    onClick={() => {
                      this.setState({
                        currentPhoto: index,
                      });
                    }}
                  >
                    <img src={item} key={index} alt="gallery" />
                  </li>
                ))}
              </ul>

              <div className={styles.mainContent}>
                <div
                  className={
                    this.props.one.inStock === true
                      ? styles.currPhotoBox
                      : styles.outOfStockBox
                  }
                >
                  <img
                    src={this.props.one.gallery[this.state.currentPhoto]}
                    alt="currentPhoto"
                  />
                  {!this.props.one.inStock && (
                    <span className={styles.outOfStockInfo}>Out of Stock</span>
                  )}
                </div>

                <div className={styles.mainContent__info}>
                  <p className={styles.mainContent__info__name}>
                    {this.props.one.name}
                  </p>
                  <ul className={styles.mainContent__info__attributes}>
                    {this.state.attributesId.map((item, index) => (
                      <li
                        key={index}
                        className={styles.mainContent__info__attribute}
                      >
                        <div>
                          <p className={styles.mainContent__info__attribute}>
                            {" "}
                            {item}{" "}
                          </p>
                          <ul
                            className={
                              styles.mainContent__info__attribute__attributeList
                            }
                          >
                            {this.props.one.attributes[index].items.map(
                              (itemValue, indexValue) => (
                                <li
                                  key={indexValue}
                                  className={
                                    this.state.activeFilters[index] ===
                                    indexValue
                                      ? styles.mainContent__info__attribute__attributeListItem__active
                                      : styles.mainContent__info__attribute__attributeListItem
                                  }
                                  style={
                                    this.props.one.attributes[index].type ===
                                    "swatch"
                                      ? {
                                          backgroundColor: itemValue.value, //style here is not static
                                        }
                                      : null
                                  }
                                  value={indexValue}
                                  onClick={(e) => {
                                    if (
                                      !this.props.openedCart &&
                                      !this.props.openedCurrencyList
                                    ) {
                                      let items = [...this.state.activeFilters];
                                      let item = { ...items[index] };
                                      item = e.target.value;
                                      items[index] = item;

                                      this.setState({
                                        activeFilters: items,
                                        attribute: item,
                                        addToCartObject: {
                                          ...this.props.one, //object desctructuring
                                          num: this.state.number,
                                          activeFilters: items,
                                          quantity: 1,
                                          all: true,
                                        },
                                      });
                                    }
                                  }}
                                >
                                  {this.props.one.attributes[index].type !==
                                  "swatch"
                                    ? itemValue.value
                                    : null}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <p className={styles.mainContent__info__priceHeader}>Price</p>
                  <p className={styles.mainContent__info__price}>
                    <img
                      className={styles.currencySymbol}
                      src={this.state.myCur}
                      alt="currencySym"
                    ></img>

                    {this.props.one.prices[this.props.currency].amount}
                  </p>
                  <div
                    className={
                      this.props.one.inStock
                        ? styles.mainContent__info__button
                        : styles.mainContent__info__button__outOfStock
                    }
                  >
                    <Link
                      className={styles.mainContent__info__button_link}
                      to={!this.props.openedCart ? `/userCart` : `/`}
                      onClick={
                        !this.props.openedCart
                          ? this.addToCart
                          : this.notAddToCart
                      }
                    >
                      Add to cart
                    </Link>
                  </div>
                  {/* used RegExp to delete all Html tags */}
                  <p className={styles.mainContent__info__description}>
                    {this.props.one.description.replace(/<\/?[a-zA-Z]+>/gi, "")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <Spinner />;
  }
}

const mapStateToProps = (state) => ({
  one: state.categoryListReducer.one,
  oneTech: state.categoryListReducer.oneTech,
  oneClothes: state.categoryListReducer.oneClothes,
  dataList: state.categoryListReducer.dataList,
  currency: state.myCurrencyReducer.currency,
  quantityArray: state.cartReducer.quantityArray,
  openedCart: state.toggleCartInMenuReducer.openedCart,
  openedCurrencyList: state.toggleCurrencyListReducer.openedCurrencyList,
  cart: state.cartReducer.cart,
});
export default connect(mapStateToProps, {
  getOne,
  getOneTech,
  getOneClothes,
  fetchDataList,
  getCurrency,
  addProduct,
  addQuantity,
  toggleCartInMenu,
  toggleCurrencyMenu,
})(ProductPage);
