import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { connect } from "react-redux";
import { getCurrency } from "../../store/actions/myCurrencyActions";
import {
  getOne,
  getOneTech,
  getOneClothes,
} from "../../store/actions/categoryListActions";
import { addQuantity } from "../../store/actions/cartActions";
import CartOverlayProductsAttributes from "./CartOverlayProductsAttributes";
import RightCardOverlay from "./RightCardOverlay";

export class CartOverlayProducts extends PureComponent {
  recalculateSum = () => {
    this.props.recalculateTotalSum();
  };
  render() {
    return (
      <div>
        <ul className={styles.choosenProducts}>
          {this.props.cart.map((item, index) => (
            <li key={index} className={styles.item}>
              <div className={styles.leftCard}>
                <p className={styles.productName}>{item.name}</p>
                <div className={styles.productInfo}>
                  <img
                    src={this.props.curSymbols[this.props.currency]}
                    alt=""
                  />
                  <p>
                    {(
                      item.prices[this.props.currency].amount *
                      this.props.quantityArray[index]
                    ).toFixed(2)}
                  </p>
                </div>

                <CartOverlayProductsAttributes
                  item={item}
                  index={index}
                  cart={this.props.cart}
                />

                <button
                  className={styles.goToDescription}
                  onClick={() => {
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
                  }}
                >
                  <Link
                    className={styles.goToDescription__content}
                    to={`/one/${item.category}/${item.num}`}
                  >
                    Description
                  </Link>
                </button>
              </div>

              <RightCardOverlay
                index={index}
                item={item}
                counters={this.props.counters}
                addQuantity={this.props.addQuantity}
                recalculateSum={this.recalculateSum}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  quantityArray: state.cartReducer.quantityArray,
  currency: state.myCurrencyReducer.currency,
});

export default connect(mapStateToProps, {
  getCurrency,
  getOne,
  getOneTech,
  getOneClothes,
  addQuantity,
})(CartOverlayProducts);
