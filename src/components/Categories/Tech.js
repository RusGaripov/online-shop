import React, { PureComponent } from "react";
import styles from "./Categories.module.css";
import { connect } from "react-redux";
import {
  fetchDataList,
  fetchDataListTech,
  getOne,
  getOneTech,
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
import Spinner from "../Spinner/Spinner";

export class Tech extends PureComponent {
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
    this.props.fetchDataListTech();
    this.props.getCurrency();

    /*Filtering data by category */
    /*  if (this.props.dataList) {
      for (let i = 0; i < this.props.dataList.length; i++) {
        if (this.props.dataList[i].category === "tech") {
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
  /*Go to ProductPage */
  handleClick = (e) => {
    const id = e.target.baseURI.slice(26);
    this.props.getOneTech(id);
  };

  addToCart = () => {
    this.props.addProduct(this.state.addToCartObject);
    if (this.props.quantityArray !== [1]) {
      let newArray = this.props.quantityArray;
      newArray.push(1);
      this.props.addQuantity(1, newArray);
    }
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
          <h2 className={styles.header}>Tech</h2>
          <ul className={styles.list}>
            {this.props.dataListTech ? (
              this.props.dataListTech.map((item, index) => (
                <li
                  className={
                    item.inStock === false ? styles.outOfStock : styles.listItem
                  }
                  key={index}
                  value={index}
                  onClick={() => {
                    if (
                      !this.props.openedCart &&
                      !this.props.openedCurrencyList
                    )
                      this.props.getOneTech(index + 1);
                  }}
                >
                  <Link
                    className={styles.link}
                    value={index}
                    to={
                      !this.props.openedCart && !this.props.openedCurrencyList
                        ? `/one/${item.category}/${index + 1}`
                        : `/`
                    }
                  >
                    <img
                      className={styles.listItem__image}
                      src={item.gallery[0]}
                      alt=""
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
                          alt="curSymbol"
                        ></img>
                      ) : (
                        <img
                          className={styles.currencySymbol}
                          src={USD}
                          alt="currencySymbol2"
                        ></img>
                      )}

                      <p className={styles.currency}>
                        {this.props.currency
                          ? item.prices[this.props.currency].amount
                          : item.prices[0].amount}
                      </p>
                    </div>
                  </Link>
                  {item.inStock && (
                    <div
                      className={styles.addToCart}
                      onClick={() => {
                        if (
                          !this.props.openedCart &&
                          !this.props.openedCurrencyList
                        ) {
                          this.setState(
                            {
                              addToCartObject: {
                                name: this.props.dataListTech[index].name,
                                category:
                                  this.props.dataListTech[index].category,
                                //  num: index,
                                prices: this.props.dataListTech[index].prices,
                                gallery: this.props.dataListTech[index].gallery,
                                attributes:
                                  this.props.dataListTech[index].attributes,
                                activeFilters: "",
                                quantity: 1,
                              },
                            },
                            this.addToCart
                          );
                        }
                      }}
                    >
                      Add to Cart
                    </div>
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
  dataListTech: state.categoryListReducer.dataListTech,
  one: state.categoryListReducer.one,
  oneTech: state.categoryListReducer.oneTech,
  currency: state.myCurrencyReducer.currency,
  openedCart: state.toggleCartInMenuReducer.openedCart,
  openedCurrencyList: state.toggleCurrencyListReducer.openedCurrencyList,
  quantityArray: state.cartReducer.quantityArray,
});

export default connect(mapStateToProps, {
  fetchDataList,
  fetchDataListTech,
  getOne,
  getOneTech,
  getCurrency,
  addProduct,
  addQuantity,
  toggleCartInMenu,
  toggleCurrencyMenu,
})(Tech);
