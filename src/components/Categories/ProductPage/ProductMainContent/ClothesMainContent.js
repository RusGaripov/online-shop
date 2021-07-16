import React, { PureComponent } from "react";
import styles from "../ProductPage.module.css";
import { Link } from "react-router-dom";
import ClothesAttributes from "./MainContentAttributes/ClothesAttributes";

export class ClothesMainContent extends PureComponent {
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
    if (this.props.oneClothes) {
      for (let i = 0; i < this.props.oneClothes.attributes.length; i++) {
        attrId.push(this.props.oneClothes.attributes[i].id);
        activeFilt.push(0);
      }
      this.setState({
        attributesId: attrId,
        activeFilters: activeFilt,
        addToCartObject: {
          ...this.props.oneClothes,
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
    if (this.props.oneClothes) {
      for (let i = 0; i < this.props.oneClothes.attributes.length; i++) {
        attrId.push(this.props.oneClothes.attributes[i].id);
        activeFilt.push(0);
      }
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i] === "/") {
        count += 1;
      }
      if (count === 3) {
        let b = a.slice(i, a.length);
        if (this.props.oneClothes) {
          this.setState({
            arr: arr1,
            attributesId: attrId,
            activeFilters: activeFilt,
            number: Number.parseInt(b),
            addToCartObject: {
              num: Number.parseInt(b),
              ...this.props.oneClothes,
              activeFilters: activeFilt,
              quantity: 1,
              all: false,
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
        ...this.props.oneClothes,
        num: this.state.number,
        activeFilters: activeFiltersValue,
        quantity: 1,
        all: false,
      },
    });
  };
  render() {
    return (
      <div className={styles.mainContent}>
        <div
          className={
            this.props.oneClothes.inStock === true
              ? styles.currPhotoBox
              : styles.outOfStockBox
          }
        >
          <img
            src={this.props.oneClothes.gallery[this.props.currentPhoto]}
            alt="currentPhoto"
          />
          {!this.props.oneClothes.inStock && (
            <span className={styles.outOfStockInfo}>Out of Stock</span>
          )}
        </div>
        <div className={styles.mainContent__info}>
          <p className={styles.mainContent__info__name}>
            {this.props.oneClothes.name}
          </p>

          <ClothesAttributes
            activeFilters={this.state.activeFilters}
            attributesId={this.state.attributesId}
            openedCart={this.props.openedCart}
            openedCurrencyList={this.props.openedCurrencyList}
            oneClothes={this.props.oneClothes}
            myData={this.myData}
          />

          <p className={styles.mainContent__info__priceHeader}>Price</p>
          <p className={styles.mainContent__info__price}>
            <img
              className={styles.currencySymbol}
              src={this.props.myCur}
              alt="currencySym"
            ></img>

            {this.props.oneClothes.prices[this.props.currency].amount}
          </p>
          <div
            className={
              this.props.oneClothes.inStock
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
            {this.props.oneClothes.description.replace(/<\/?[a-zA-Z]+>/gi, "")}
          </p>
        </div>
      </div>
    );
  }
}

export default ClothesMainContent;
