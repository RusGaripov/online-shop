import React, { PureComponent } from "react";
import plusSquare from "../../images/plusSquare.svg";
import minusSquare from "../../images/minusSquare.svg";
import styles from "./Navbar.module.css";

export class RightCardOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      counters: null,
    };
  }
  recalculateSumByQuantity = () => {
    this.props.recalculateSum();
  };
  render() {
    return (
      <div className={styles.rightCard}>
        <div className={styles.addToCard}>
          <img
            src={plusSquare}
            onClick={() => {
              let copyCounters = this.props.counters;
              let newCount = copyCounters[this.props.index] + 1;
              copyCounters.splice(this.props.index, 1);
              copyCounters.splice(this.props.index, 0, newCount);
              this.props.addQuantity(this.props.index, copyCounters);
              this.setState(
                {
                  counters: copyCounters,
                },
                this.recalculateSumByQuantity()
              );
              this.props.addQuantity(this.props.index, copyCounters);
            }}
            alt=""
          />
          <p className={styles.count}>
            {this.props.counters[this.props.index]}
          </p>
          <img
            src={minusSquare}
            onClick={() => {
              let copyCounters = this.props.counters;
              if (this.state.counters[this.props.index] > 1) {
                let newCount = copyCounters[this.props.index] - 1;
                copyCounters.splice(this.props.index, 1);
                copyCounters.splice(this.props.index, 0, newCount);
                this.setState(
                  {
                    counters: copyCounters,
                  },
                  this.recalculateSumByQuantity()
                );
                this.props.addQuantity(this.props.index, this.state.counters);
              }
            }}
            alt=""
          />
        </div>
        <div className={styles.galleryPhotoWrapper}>
          <img
            className={styles.galleryPhoto}
            src={this.props.item.gallery[0]}
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default RightCardOverlay;
