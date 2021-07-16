import React, { PureComponent } from "react";
import plusSquare from "../../../images/plusSquare.svg";
import minusSquare from "../../../images/minusSquare.svg";
import styles from "./Cart.module.css";
import PhotosSlider from "./PhotosSlider";

export class RightCart extends PureComponent {
  render() {
    return (
      <div className={styles.rightCart}>
        <div className={styles.plusMinus}>
          <img
            onClick={() => {
              if (!this.props.openedCart && !this.props.openedCurrencyList) {
                let copyCounters = this.props.counters;
                let newCount = copyCounters[this.props.index] + 1;
                copyCounters.splice(this.props.index, 1);
                copyCounters.splice(this.props.index, 0, newCount);
                this.setState({
                  counters: copyCounters,
                  counter: newCount,
                });
                this.props.recalculateTotalSum();
                this.props.checkQuantityArrayFunc(
                  copyCounters,
                  this.props.index
                );
              }
            }}
            className={styles.plusMinus__plus}
            src={plusSquare}
            alt="plus"
          />
          <p>{this.props.counters[this.props.index]}</p>
          <img
            onClick={() => {
              if (!this.props.openedCart && !this.props.openedCurrencyList) {
                let copyCounters = this.props.counters;
                if (this.props.counters[this.props.index] > 1) {
                  let newCount = this.props.counters[this.props.index] - 1;
                  copyCounters.splice(this.props.index, 1);
                  copyCounters.splice(this.props.index, 0, newCount);
                  this.setState({
                    counters: copyCounters,
                    counter: newCount,
                  });
                  this.props.recalculateTotalSum();
                  this.props.checkQuantityArrayFunc(
                    copyCounters,
                    this.props.index
                  );
                }
              }
            }}
            className={styles.plusMinus__minus}
            src={minusSquare}
            alt="minus"
          />
        </div>
        <div>
          <PhotosSlider
            index={this.props.index}
            changePhotos={this.props.changePhotos}
            cart={this.props.cart}
            num={this.props.num}
          />
        </div>
      </div>
    );
  }
}

export default RightCart;
