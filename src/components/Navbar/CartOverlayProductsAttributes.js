import React, { PureComponent } from "react";
import styles from "./Navbar.module.css";

export class CartOverlayProductsAttributes extends PureComponent {
  render() {
    return (
      <ul className={styles.attributes}>
        {this.props.item.attributes.map((itemValue, indexValue) => (
          <li key={indexValue} className={styles.attributes_item}>
            <p className={styles.attributes__item__name}>{itemValue.name}</p>
            <ul className={styles.attributesValue}>
              {itemValue.items.map((item2, index2) => (
                <li
                  key={index2}
                  className={
                    this.props.cart[this.props.index].attributes[indexValue]
                      .type === "swatch"
                      ? styles.attributesValue__item__swatch
                      : styles.attributesValue__item
                  }
                  style={
                    this.props.cart[this.props.index].attributes[indexValue]
                      .type === "swatch"
                      ? {
                          backgroundColor: item2.value,
                        }
                      : this.props.item.activeFilters[indexValue] !== index2
                      ? {
                          opacity: "0.3",
                          backgroundColor: "#A6A6A6",
                        }
                      : null
                  }
                >
                  {this.props.cart[this.props.index].attributes[indexValue]
                    .type !== "swatch"
                    ? item2.value
                    : null}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }
}

export default CartOverlayProductsAttributes;
