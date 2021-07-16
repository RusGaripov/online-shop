import React, { PureComponent } from "react";
import styles from "./Cart.module.css";

export class MainContentCartAttributes extends PureComponent {
  render() {
    return (
      <ul className={styles.listOfAttributes}>
        {this.props.cart[this.props.index].attributes &&
          this.props.cart[this.props.index].attributes.map(
            (itemValue, indexValue) => (
              <li
                key={indexValue}
                className={
                  this.props.item.activeFilters[this.props.index] === indexValue
                    ? styles.attributeListItem__active
                    : styles.attributeListItem
                }
              >
                <p className={styles.attributeName}> {itemValue.name}</p>
                <ul className={styles.attributeList}>
                  {itemValue.items.map((item, index2) => (
                    <li
                      key={index2}
                      className={
                        this.props.cart[this.props.index].activeFilters[
                          indexValue
                        ] === index2
                          ? styles.attributeListitem__active
                          : styles.attributeListitem
                      }
                      style={
                        this.props.cart[this.props.index].attributes[indexValue]
                          .type === "swatch"
                          ? {
                              backgroundColor: item.value, // style  here is not static
                            }
                          : null
                      }
                    >
                      {this.props.cart[this.props.index].attributes[indexValue]
                        .type !== "swatch"
                        ? item.value
                        : null}
                    </li>
                  ))}
                </ul>
              </li>
            )
          )}
      </ul>
    );
  }
}

export default MainContentCartAttributes;
