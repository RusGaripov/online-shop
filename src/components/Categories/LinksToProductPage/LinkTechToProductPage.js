import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import styles from "../Categories.module.css";
import USD from "../../../images/USD.png";

export class LinkTechToProductPage extends PureComponent {
  render() {
    return (
      <Link
        className={styles.link}
        value={this.props.index}
        to={
          !this.props.openedCart && !this.props.openedCurrencyList
            ? `/one/${this.props.item.category}/${this.props.index + 1}`
            : `/`
        }
      >
        <img
          className={styles.listItem__image}
          src={this.props.item.gallery[0]}
          alt=""
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
              ? this.props.item.prices[this.props.currency].amount
              : this.props.item.prices[0].amount}
          </p>
        </div>
      </Link>
    );
  }
}

export default LinkTechToProductPage;
