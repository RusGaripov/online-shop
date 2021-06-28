import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import goBack from "../../images/goBack.png";
import cardIcon from "../../images/cardIcon.png";
import plusSquare from "../../images/plusSquare.svg";
import minusSquare from "../../images/minusSquare.svg";
import { connect } from "react-redux";
import { fetchDataList } from "../../store/actions/categoryListActions";
import { toggleCartInMenu } from "../../store/actions/toggleCartInMenuActions";
import { addProduct, addQuantity } from "../../store/actions/cartActions";
import { getCurrency } from "../../store/actions/myCurrencyActions";
import USD from "../../images/USD.png";
import GBP from "../../images/GBP.png";
import AUD from "../../images/AUD.png";
import JPY from "../../images/JPY.png";
import RUB from "../../images/RUB.png";
import arrowDown from "../../images/arrowDown.svg";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: ["clothes", "tech", "all"],
      myCard: false,
      choosenCurrency: 0,
      currencyList: ["USD", "GBP", "AUD", "JPY", "RUB"],
      curSymbols: [USD, GBP, AUD, JPY, RUB],
      counters: [1],
      items: 0,
    };
  }

  componentDidMount() {
    this.props.history.push("/");
    if (this.props.dataList) {
      let arr = [];
      for (let i = 0; i < this.props.dataList.length; i++) {
        arr.push(this.props.dataList[i].category);
      }
      this.setState({
        choosenCurrency: this.props.currency,
        counters: this.props.quantityArray,
      });
    }
  }

  /*Open and Close my Cart in the Navbar Component */
  handleClick = () => {
    if (this.state.myCard === true) {
      this.props.toggleCartInMenu(false);
      this.setState({
        myCard: false,
      });
    } else {
      let sum = 0;
      for (let i = 0; i < this.props.cart.length; i++) {
        sum +=
          this.props.cart[i].prices[this.props.currency].amount *
          this.props.quantityArray[i];
      }
      this.props.toggleCartInMenu(true);
      this.setState({
        myCard: true,
        totalSum: sum,
      });
    }
    this.setState({
      counters: this.props.quantityArray,
    });

    let sum = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      sum += this.props.quantityArray[i];
    }
    this.setState({
      items: sum,
    });
    console.log(this.state.items, sum);
  };

  /*Open and Close Currency List in the Navbar Component */

  handleClickCurrencyList = () => {
    if (this.state.currencylistVisibility === true) {
      this.setState({
        currencylistVisibility: false,
      });
    } else {
      this.setState({
        currencylistVisibility: true,
      });
    }
  };

  /*Choose currency in the Currency List */

  handleClickCurrency = (e) => {
    this.props.getCurrency(e.target.getAttribute("value"));
    this.setState({
      choosenCurrency: e.target.getAttribute("value"),
    });
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <nav>
            <ul className={styles.nav}>
              {this.state.array !== []
                ? this.state.array.map((uniqueCategory, index) => (
                    <li key={index}>
                      {uniqueCategory !== "all" && (
                        <NavLink
                          to={"/" + uniqueCategory}
                          className={styles.category}
                          activeClassName={styles.activeLink}
                        >
                          {uniqueCategory}
                        </NavLink>
                      )}
                      {uniqueCategory === "all" && (
                        <NavLink
                          exact
                          to={"/"}
                          className={styles.category}
                          activeClassName={styles.activeLink}
                        >
                          {uniqueCategory}
                        </NavLink>
                      )}
                    </li>
                  ))
                : null}
            </ul>
          </nav>
          <img
            className={styles.goBack}
            onClick={this.props.history.goBack}
            src={goBack}
            alt="goBack"
          />
          <div className={styles.optionsIcons}>
            <div
              onClick={this.handleClickCurrencyList}
              className={styles.choiceOfCurrency}
            >
              <img
                src={this.state.curSymbols[this.state.choosenCurrency]}
                alt="currencyIcon"
                className={styles.currency}
              />
              <img
                src={arrowDown}
                alt="arrowDown"
                className={styles.arrowDown}
              />
            </div>

            {this.state.currencylistVisibility && (
              <ul className={styles.currency__choose}>
                {this.state.currencyList.map((cur, index) => (
                  <li
                    key={index}
                    onClick={this.handleClickCurrency}
                    value={index}
                    className={styles.currencyList__item}
                  >
                    <img
                      id={index}
                      style={{ pointerEvents: "none" }}
                      src={this.state.curSymbols[index]}
                    />

                    {cur}
                  </li>
                ))}
              </ul>
            )}
            <div className={styles.cardBox} onClick={this.handleClick}>
              <img className={styles.cardIcon} src={cardIcon} alt="cardIcon" />
              <p className={styles.myBagItem}>{this.props.cart.length}</p>
            </div>
          </div>
        </div>
        {this.state.myCard && (
          <div className={styles.myCard}>
            <h5>
              <span>My Bag </span>, {this.state.items} items
            </h5>

            <ul className={styles.choosenProducts}>
              {this.props.cart.map((item, index) => (
                <li key={index} className={styles.item}>
                  <div className={styles.leftCard}>
                    <p className={styles.productName}>{item.name}</p>
                    <div className={styles.productInfo}>
                      <img
                        src={this.state.curSymbols[this.props.currency]}
                        alt=""
                      />
                      <p>
                        {(
                          item.prices[this.props.currency].amount *
                          this.props.quantityArray[index]
                        ).toFixed(2)}
                      </p>
                    </div>
                    <ul className={styles.attributes}>
                      {item.attributes.map((itemValue, indexValue) => (
                        <li key={indexValue} className={styles.attributes_item}>
                          <p className={styles.attributes__item__name}>
                            {itemValue.name}
                          </p>
                          <ul className={styles.attributesValue}>
                            {itemValue.items.map((item2, index2) => (
                              <li
                                key={index2}
                                className={
                                  this.props.cart[index].attributes[indexValue]
                                    .type === "swatch"
                                    ? styles.attributesValue__item__swatch
                                    : styles.attributesValue__item
                                }
                                style={
                                  this.props.cart[index].attributes[indexValue]
                                    .type === "swatch"
                                    ? {
                                        backgroundColor: item2.value,
                                      }
                                    : item.activeFilters[indexValue] !== index2
                                    ? {
                                        opacity: "0.3",
                                        backgroundColor: "#A6A6A6",
                                      }
                                    : null
                                }
                              >
                                {this.props.cart[index].attributes[indexValue]
                                  .type !== "swatch"
                                  ? item2.value
                                  : null}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.rightCard}>
                    <div className={styles.addToCard}>
                      <img
                        src={plusSquare}
                        onClick={() => {
                          let copyCounters = this.state.counters;
                          let newCount = copyCounters[index] + 1;
                          copyCounters.splice(index, 1);
                          copyCounters.splice(index, 0, newCount);
                          this.props.addQuantity(index, copyCounters);
                          this.setState({
                            counters: copyCounters,
                          });
                        }}
                        alt=""
                      />
                      <p className={styles.count}>
                        {this.state.counters && this.state.counters[index]}
                      </p>
                      <img
                        src={minusSquare}
                        onClick={() => {
                          let copyCounters = this.state.counters;
                          if (this.state.counters[index] > 1) {
                            let newCount = copyCounters[index] - 1;
                            copyCounters.splice(index, 1);
                            copyCounters.splice(index, 0, newCount);
                            this.props.addQuantity(index, copyCounters);
                            this.setState({
                              counters: copyCounters,
                            });
                          }
                        }}
                        alt=""
                      />
                    </div>
                    <div className={styles.galleryPhotoWrapper}>
                      <img
                        className={styles.galleryPhoto}
                        src={item.gallery}
                        alt=""
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.total}>
              <p className={styles.totalSum}>Total</p>
              <div className={styles.totalAmount}>
                <img
                  src={this.state.curSymbols[this.props.currency]}
                  alt="symbol"
                />
                <p>{this.state.totalSum.toFixed(2)}</p>
              </div>
            </div>
            <div className={styles.buttons}>
              <Link className={styles.buttonLeft__link} to={`/userCart`}>
                <div className={styles.buttonLeft} onClick={this.handleClick}>
                  View bag
                </div>
              </Link>
              <div className={styles.buttonRight} onClick={this.handleClick}>
                Check out
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataList: state.categoryListReducer.dataList,
  currency: state.myCurrencyReducer.currency,
  cart: state.cartReducer.cart,
  openedCart: state.toggleCartInMenuReducer.openedCart,
  quantityArray: state.cartReducer.quantityArray,
});
let WithRouterNavbar = withRouter(Navbar);

export default connect(mapStateToProps, {
  fetchDataList,
  getCurrency,
  addProduct,
  addQuantity,
  toggleCartInMenu,
})(WithRouterNavbar);
