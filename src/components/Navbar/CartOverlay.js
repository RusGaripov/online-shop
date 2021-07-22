import React, { PureComponent } from "react";
import cardIcon from "../../images/cardIcon.png";
import styles from "./Navbar.module.css";
import { connect } from "react-redux";
import { toggleCartInMenu } from "../../store/actions/toggleCartInMenuActions";
import { addProduct, addQuantity } from "../../store/actions/cartActions";
import { Link } from "react-router-dom";
import USD from "../../images/USD.png";
import GBP from "../../images/GBP.png";
import AUD from "../../images/AUD.png";
import JPY from "../../images/JPY.png";
import RUB from "../../images/RUB.png";
import CartOverlayProducts from "./CartOverlayProducts";

export class CartOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      myCard: false,
      choosenCurrency: 0,
      counters: [1],
      items: 0,
      curSymbols: [USD, GBP, AUD, JPY, RUB],
      myCur: null,
    };
  }

  componentDidMount() {
    this.setState({
      choosenCurrency: this.props.currency,
      counters: this.props.quantityArray,
      myCur: this.state.curSymbols[this.props.currency],
      isRendered: false,
    });
  }

  recalculateTotalSum = () => {
    let sum = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      if (this.state.counters[i] !== undefined) {
        sum +=
          this.props.cart[i].prices[this.props.currency].amount *
          this.state.counters[i];
      }
      if (this.state.counters[i] === undefined) {
        sum += this.props.cart[i].prices[this.props.currency].amount;
      }
    }
    this.setState({
      totalSum: sum,
      counters: this.props.quantityArray,
    });
  };

  handleClick = () => {
    if (
      this.props.openedCart === false &&
      this.props.openedCurrencyList === false
    ) {
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
    } else {
      this.props.toggleCartInMenu(false);
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
  };

  render() {
    return (
      <div>
        <div className={styles.cardBox} onClick={this.handleClick}>
          <img className={styles.cardIcon} src={cardIcon} alt="cardIcon" />
          {this.props.cart.length > 0 ? (
            <p className={styles.myBagItem}> {this.props.cart.length} </p>
          ) : null}
        </div>
        {this.props.openedCart && (
          <div className={styles.myCard}>
            <h5>
              <span> My Bag &nbsp; </span>
              {this.state.items} items
            </h5>

            <CartOverlayProducts
              curSymbols={this.state.curSymbols}
              counters={this.state.counters}
              totalSum={this.state.totalSum}
              recalculateTotalSum={this.recalculateTotalSum}
            />

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
  openedCart: state.toggleCartInMenuReducer.openedCart,
  openedCurrencyList: state.toggleCurrencyListReducer.openedCurrencyList,
  cart: state.cartReducer.cart,
  quantityArray: state.cartReducer.quantityArray,
  currency: state.myCurrencyReducer.currency,
});

export default connect(mapStateToProps, {
  toggleCartInMenu,
  addQuantity,
  addProduct,
})(CartOverlay);
