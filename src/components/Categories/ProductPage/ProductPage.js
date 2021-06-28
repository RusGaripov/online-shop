import React, { Component } from "react";
import styles from "./ProductPage.module.css";
import { Link } from "react-router-dom";
import {
  getOne,
  fetchDataList,
} from "../../../store/actions/categoryListActions";
import { getCurrency } from "../../../store/actions/myCurrencyActions";
import { addProduct, addQuantity } from "../../../store/actions/cartActions";
import { connect } from "react-redux";
import USD from "../../../images/USD.png";
import GBP from "../../../images/GBP.png";
import AUD from "../../../images/AUD.png";
import JPY from "../../../images/JPY.png";
import RUB from "../../../images/RUB.png";
import Spinner from "../../Spinner/Spinner";

export class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      cur: [USD, GBP, AUD, JPY, RUB],
      myCur: null,
      myAmount: 1,
      activeFilter: 0,
      activeFilters: [],
      attribute: "",
      attributesId: [],
      addToCartObject: {},
      currentPhoto: 0,
    };
  }
  componentDidMount() {
    this.props.getCurrency();

    const id = this.props.match.params.id;
    this.props.getOne(id);
    let arr1 = [];
    let attrId = [];
    let activeFilt = [];
    if (this.props.one) {
      for (let i = 0; i < this.props.one.attributes.length; i++) {
        attrId.push(this.props.one.attributes[i].id);
        activeFilt.push(0);
      }
    }

    this.setState({
      arr: arr1,
      cur: [USD, GBP, AUD, JPY, RUB],
      myCur: null,
      myAmount: null,
      attributesId: attrId,
      activeFilters: activeFilt,
    });
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
  addToCart = () => {
    this.props.addProduct(this.state.addToCartObject);
  };

  choosePhoto = (e) => {
    console.log(e.target.value);
    this.setState({
      currentPhoto: e.target.value,
    });
  };
  render() {
    if (this.props.one) {
      return (
        <div>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <ul className={styles.gallery}>
                {this.props.one &&
                  this.props.one.gallery.map((item, index) => (
                    <li
                      key={index}
                      value={index}
                      onClick={() => {
                        this.setState({
                          currentPhoto: index,
                        });
                      }}
                      value={index}
                    >
                      <img src={item} key={index} alt="gallery" />
                    </li>
                  ))}
              </ul>

              <div className={styles.mainContent}>
                <div className={styles.currPhotoBox}>
                  <img
                    src={this.props.one.gallery[this.state.currentPhoto]}
                    alt="currentPhoto"
                  />
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
                                          backgroundColor: itemValue.value,
                                        }
                                      : null
                                  }
                                  value={indexValue}
                                  onClick={(e) => {
                                    this.state.activeFilters[index] =
                                      e.target.value;
                                    let items = [...this.state.activeFilters];
                                    let item = { ...items[index] };
                                    item = e.target.value;
                                    items[index] = item;

                                    this.setState({
                                      activeFilters: items,
                                      attribute: item,
                                      addToCartObject: {
                                        name: this.props.one.name,
                                        prices: this.props.one.prices,
                                        gallery: this.props.one.gallery[0],
                                        attributes: this.props.one.attributes,
                                        activeFilters: items,
                                        quantity: 1,
                                      },
                                    });
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
                  <div className={styles.mainContent__info__button}>
                    <Link
                      className={styles.mainContent__info__button_link}
                      to={`/userCart`}
                      onClick={this.addToCart}
                    >
                      Add to cart
                    </Link>
                  </div>
                  <p className={styles.mainContent__info__description}>
                    {this.props.one.description}
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
  dataList: state.categoryListReducer.dataList,
  currency: state.myCurrencyReducer.currency,
  quantityArray: state.cartReducer.quantityArray,
});
export default connect(mapStateToProps, {
  getOne,
  fetchDataList,
  getCurrency,
  addProduct,
  addQuantity,
})(ProductPage);
