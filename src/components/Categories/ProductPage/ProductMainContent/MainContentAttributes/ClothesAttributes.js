import React, { PureComponent } from "react";
import styles from "../../ProductPage.module.css";

export class ClothesAttributes extends PureComponent {
  render() {
    return (
      <ul className={styles.mainContent__info__attributes}>
        {this.props.attributesId.map((item, index) => (
          <li key={index} className={styles.mainContent__info__attribute}>
            <div>
              <p className={styles.mainContent__info__attribute}> {item} </p>
              <ul
                className={styles.mainContent__info__attribute__attributeList}
              >
                {this.props.oneClothes.attributes[index].items.map(
                  (itemValue, indexValue) => (
                    <li
                      key={indexValue}
                      className={
                        this.props.activeFilters[index] === indexValue
                          ? styles.mainContent__info__attribute__attributeListItem__active
                          : styles.mainContent__info__attribute__attributeListItem
                      }
                      style={
                        this.props.oneClothes.attributes[index].type ===
                        "swatch"
                          ? {
                              backgroundColor: itemValue.value,
                            }
                          : null
                      }
                      value={indexValue}
                      onClick={(e) => {
                        if (
                          !this.props.openedCart &&
                          !this.props.openedCurrencyList
                        ) {
                          let items = [...this.props.activeFilters];
                          let item = { ...items[index] };
                          item = e.target.value;
                          items[index] = item;
                          this.props.myData(items);
                        }
                      }}
                    >
                      {this.props.oneClothes.attributes[index].type !== "swatch"
                        ? itemValue.value
                        : null}
                    </li>
                  )
                )}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default ClothesAttributes;
