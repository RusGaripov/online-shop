import React, { PureComponent } from "react";
import styles from "../Categories.module.css";
import { Link } from "react-router-dom";
import cart from "../../../images/cart.png";

export class AllToCart extends PureComponent {
  render() {
    return (
      <div>
        {this.props.item.inStock && (
          <Link
            to={
              !this.props.openedCart && !this.props.openedCurrencyList
                ? `/userCart`
                : `/`
            }
            onClick={() => {
              if (!this.props.openedCart && !this.props.openedCurrencyList) {
                let a = [];
                for (let i = 0; i < this.props.item.attributes.length; i++) {
                  a.push(0);
                }
                let count = 0;
                let b;

                for (let i = 0; i < this.props.cart.length; i++) {
                  if (
                    JSON.stringify(this.props.cart[i].name) ===
                    JSON.stringify(this.props.item.name)
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
                    {
                      ...this.props.item,
                      activeFilters: a,
                      quantity: 1,
                      all: false,
                      num: this.props.index + 1,
                    },
                    this.props.quantityArray
                  );

                  this.props.addQuantity(1, this.props.quantityArray, {
                    ...this.props.item,
                    activeFilters: a,
                    quantity: 1,
                    all: false,
                    num: this.props.index + 1,
                  });
                }
                if (count === 1) {
                  this.props.addQuantity(1, b, this.props.addToCartObject);
                }
              }
            }}
          >
            <img src={cart} alt="cart" className={styles.cart} />
          </Link>
        )}
      </div>
    );
  }
}

export default AllToCart;
