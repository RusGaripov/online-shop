import React, { Component } from "react";
import styles from "./Categories.module.css";
import { connect } from "react-redux";
import { fetchDataList, getOne } from "../../store/actions/categoryListActions";
import { getCurrency } from "../../store/actions/myCurrencyActions";
import { toggleCartInMenu } from "../../store/actions/toggleCartInMenuActions";
import { Link } from "react-router-dom";
import USD from "../../images/USD.png";
import GBP from "../../images/GBP.png";
import AUD from "../../images/AUD.png";
import JPY from "../../images/JPY.png";
import RUB from "../../images/RUB.png";
import Spinner from "../Spinner/Spinner";

export class Clothes extends Component {
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
    this.props.getCurrency();
    /*Filtering data by category */
    if (this.props.dataList) {
      for (let i = 0; i < this.props.dataList.length; i++) {
        if (this.props.dataList[i].category === "clothes") {
          this.state.arr.push(this.props.dataList[i]);
          this.state.idS.push(i + 1);
        }
      }
    }
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
  /*Go to ProductPage*/
  handleClick = (e) => {
    const id = e.target.baseURI.slice(26);
    this.props.getOne(id);
  };
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
        <h2 className={styles.header}>Clothes</h2>
        <ul className={styles.list}>
          {this.props.dataList ? (
            this.state.arr.map((item, index) => (
              <li
                className={
                  item.inStock === false ? styles.outOfStock : styles.listItem
                }
                key={index}
                onClick={this.handleClick}
              >
                <Link
                  className={styles.link}
                  value={index}
                  to={`/one/${this.state.idS[index]}`}
                >
                  <img
                    className={styles.listItem__image}
                    src={item.gallery[0]}
                    alt="image3"
                  />
                  {!item.inStock && (
                    <span className={styles.outOfStockInfo}>Out of Stock</span>
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
              </li>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginLeft: "30px",
              }}
            >
              <Spinner />
            </div>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataList: state.categoryListReducer.dataList,
  one: state.categoryListReducer.one,
  currency: state.myCurrencyReducer.currency,
  openedCart: state.toggleCartInMenuReducer.openedCart,
});

export default connect(mapStateToProps, {
  fetchDataList,
  getOne,
  getCurrency,
  toggleCartInMenu,
})(Clothes);
