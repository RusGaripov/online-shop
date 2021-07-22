import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import styles from "../Categories.module.css";
import USD from "../../../images/USD.png";

export class LinkAllToProductPage extends PureComponent {
  render() {
    return (
      <Link
        className={styles.link}
        value={this.props.index}
        to={
          !this.props.openedCart && !this.props.openedCurrencyList
            ? `/one/all/${this.props.index + 1}`
            : `/`
        }
      >
        <img
          className={
            this.props.openedCart || this.props.openedCurrencyList === true
              ? styles.listItem__image__back
              : styles.listItem__image
          }
          src={this.props.item.gallery[0]}
          alt="listItemImage"
        />

        {!this.props.item.inStock && (
          <span className={styles.outOfStockInfo}>Out of Stock</span>
        )}
        <h3> {this.props.item.name}</h3>
        <div className={styles.priceHeader}>
          {this.props.currency ? (
            <img
              className={styles.currencySymbol}
              src={this.props.myCur}
              alt="currency"
            ></img>
          ) : (
            <img
              className={styles.currencySymbol}
              src={USD}
              alt="currency2"
            ></img>
          )}

          <p className={styles.currency}>
            {this.props.currency
              ? this.props.item.prices[this.props.currency].amount
              : this.props.item.prices[0].amount}
          </p>
        </div>
      </Link>
    );
  }
}

export default LinkAllToProductPage;
