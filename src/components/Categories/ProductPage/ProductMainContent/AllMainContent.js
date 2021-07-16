import React, { PureComponent } from "react";
import styles from "../ProductPage.module.css";
import { Link } from "react-router-dom";
import AllAttributes from "./MainContentAttributes/AllAttributes";

export class AllMainContent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeFilters: [],
      attribute: "",
      addToCartObject: {},
      attributesId: [],
    };
  }
  componentDidMount() {
    let attrId = [];
    let activeFilt = [];
    if (this.props.one) {
      for (let i = 0; i < this.props.one.attributes.length; i++) {
        attrId.push(this.props.one.attributes[i].id);
        activeFilt.push(0);
      }
      this.setState({
        attributesId: attrId,
        activeFilters: activeFilt,
        addToCartObject: {
          ...this.props.one,
          num: this.state.number,
          activeFilters: activeFilt,
          quantity: 1,
          all: true,
        },
      });
    }
    this.defineNumberOfProduct();
  }

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
          count += 1;
          b = this.props.quantityArray;
          let c = this.props.quantityArray[i];
          b.splice(i, 1);
          b.splice(i, 0, c + 1);
        }
      }
      if (count === 0) {
        this.props.addProduct(
          this.state.addToCartObject,
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

  defineNumberOfProduct = () => {
    let a = this.props.z;

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
              ...this.props.one,
              activeFilters: activeFilt,
              quantity: 1,
              all: true,
            },
          });
        }
      }
    }
  };
  myData = (activeFiltersValue) => {
    this.setState({
      activeFilters: activeFiltersValue,
      addToCartObject: {
        ...this.props.one,
        num: this.state.number,
        activeFilters: activeFiltersValue,
        quantity: 1,
        all: true,
      },
    });
  };

  render() {
    return (
      <div className={styles.mainContent}>
        <div
          className={
            this.props.one.inStock === true
              ? styles.currPhotoBox
              : styles.outOfStockBox
          }
        >
          <img
            src={this.props.one.gallery[this.props.currentPhoto]}
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
          <AllAttributes
            activeFilters={this.state.activeFilters}
            attributesId={this.state.attributesId}
            openedCart={this.props.openedCart}
            openedCurrencyList={this.props.openedCurrencyList}
            one={this.props.one}
            myData={this.myData}
          />
          <p className={styles.mainContent__info__priceHeader}>Price</p>
          <p className={styles.mainContent__info__price}>
            <img
              className={styles.currencySymbol}
              src={this.props.myCur}
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
                !this.props.openedCart ? this.addToCart : this.notAddToCart
              }
            >
              Add to cart
            </Link>
          </div>
          <p className={styles.mainContent__info__description}>
            {this.props.one.description.replace(/<\/?[a-zA-Z]+>/gi, "")}
          </p>
        </div>
      </div>
    );
  }
}

export default AllMainContent;
