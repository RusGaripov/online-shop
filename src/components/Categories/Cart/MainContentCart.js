import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";
import USD from "../../../images/USD.png";
import GBP from "../../../images/GBP.png";
import AUD from "../../../images/AUD.png";
import JPY from "../../../images/JPY.png";
import RUB from "../../../images/RUB.png";
import MainContentCartAttributes from "./MainContentCartAttributes";
import RightCart from "./RightCart";

export class MainContentCart extends PureComponent {
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
      checkQuantityArray: [1],
      new: false,
      basicSum: null,
    };
  }

  componentDidMount() {
    this.setQuantitiesAndCurrency();
    this.setState({
      checkQuantityArray: this.props.quantityArray,
    });
    this.recalculateTotalSum();
  }

  componentDidUpdate() {
    if (this.state.cur[this.props.currency] !== this.state.myCur) {
      this.recalculateTotalSum();
    }
    if (this.state.new) {
      this.recalculateTotalSum();
      this.setState({
        new: false,
      });
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

    this.props.addQuantity(1, newCounters); //?
  };

  setQuantitiesAndCurrencyDelete = (index) => {
    let newCounters = this.props.quantityArray;
    newCounters.splice(index, 1);
    let numbers = [];
    for (let i = 0; i < this.props.cart.length; i++) {
      numbers.push(0);
    }
    this.setState({
      counters: newCounters,
      cartContent: this.props.cart,
      num: numbers,
      myCur: this.state.cur[this.props.currency],
    });
    this.props.addQuantity(2, newCounters);
    this.recalculateTotalSum();
  };

  recalculateTotalSum = () => {
    let sum = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      if (this.props.quantityArray[i] !== undefined) {
        sum +=
          this.props.cart[i].prices[this.props.currency].amount *
          this.props.quantityArray[i];
      }
      if (this.props.quantityArray[i] === undefined) {
        sum += this.props.cart[i].prices[this.props.currency].amount;
      }
    }
    this.props.totalSummed(sum);
  };

  changePhotos = (newArr) => {
    this.setState({
      num: newArr,
    });
  };

  checkQuantityArrayFunc = (newCheckQuantity, index) => {
    this.setState({
      new: true,
    });
    this.props.addQuantity(index, newCheckQuantity);
  };

  render() {
    return (
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
                    src={this.props.cur[this.props.currency]}
                    alt="priceInfo"
                  ></img>
                  <p>
                    {(
                      item.prices[this.props.currency].amount *
                      this.props.quantityArray[index]
                    ).toFixed(2)}
                  </p>
                </div>

                <MainContentCartAttributes
                  item={item}
                  index={index}
                  cart={this.props.cart}
                />

                <button
                  className={styles.buttonRemove}
                  onClick={() => {
                    if (
                      !this.props.openedCart &&
                      !this.props.openedCurrencyList
                    ) {
                      this.props.deleteProduct(index, this.props.quantityArray);
                      this.setState({
                        cartContent: this.props.cart,
                      });
                      this.setQuantitiesAndCurrencyDelete(index);
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
                      if (item.all === false && item.category === "clothes") {
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
                      !this.props.openedCart && !this.props.openedCurrencyList
                        ? `/one/${item.all !== true ? item.category : "all"}/${
                            item.num
                          }`
                        : `/`
                    }
                  >
                    Description
                  </Link>
                </button>
              </div>
              <RightCart
                index={index}
                cart={this.props.cart}
                addQuantity={this.props.addQuantity}
                openedCart={this.props.openedCart}
                openedCurrencyList={this.props.openedCurrencyList}
                counters={this.state.counters}
                num={this.state.num}
                changePhotos={this.changePhotos}
                recalculateTotalSum={this.recalculateTotalSum}
                checkQuantityArrayFunc={this.checkQuantityArrayFunc}
                setQuantitiesAndCurrency={this.setQuantitiesAndCurrency}
              />
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default MainContentCart;
