import React, { PureComponent } from "react";
import styles from "../Categories.module.css";
import cart from "../../../images/cart.png";

export class AllToCart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRendered: false,
    };
  }

  render() {
    return (
      <div>
        {this.props.item.inStock && (
          <div
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
                    let c;
                    if (this.props.quantityArray[i])
                      c = this.props.quantityArray[i];
                    else c = 1;
                    b.splice(i, 1);
                    b.splice(i, 0, 1 + c);
                  }
                }
                if (count === 0) {
                  let d = [...this.props.quantityArray, 1];
                  this.props.addProduct(
                    {
                      ...this.props.item,
                      activeFilters: a,
                      quantity: 1,
                      all: true,
                      num: this.props.index + 1,
                    },
                    b
                  );
                  this.props.addQuantity(1, d, {
                    ...this.props.item,
                    activeFilters: a,
                    quantity: 1,
                    all: true,
                    num: this.props.index + 1,
                  });
                }
                if (count === 1) {
                  this.props.addQuantity(1, b, {
                    ...this.props.item,
                    activeFilters: 0,
                    quantity: 1,
                    all: true,
                    num: this.props.index + 1,
                  });
                }
                this.props.toggleCartInMenu(false);
              }
            }}
          >
            <img
              src={cart}
              alt="cart"
              className={
                this.props.openedCart || this.props.openedCurrencyList === true
                  ? styles.cart__back
                  : styles.cart
              }
            />
          </div>
        )}
      </div>
    );
  }
}

export default AllToCart;
