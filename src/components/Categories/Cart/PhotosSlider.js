import React, { PureComponent } from "react";
import leftArrow from "../../../images/leftArrow.png";
import rightArrow from "../../../images/rightArrow.png";
import styles from "./Cart.module.css";

export class PhotosSlider extends PureComponent {
  render() {
    return (
      <ul className={styles.photosSlider}>
        <div className={styles.leftArrowBox}>
          {this.props.cart[this.props.index].gallery.length > 1 ? (
            <img
              className={styles.leftArrow}
              onClick={() => {
                let newArr = [...this.props.num];
                let a = this.props.num[this.props.index] - 1;
                if (a >= 0) {
                  newArr.splice(this.props.index, 1);
                  newArr.splice(this.props.index, 0, a);
                  this.props.changePhotos(newArr);
                }
              }}
              src={leftArrow}
              alt="left"
            />
          ) : null}
        </div>

        {this.props.cart[this.props.index].gallery.map((itemVal, itemInd) => (
          <li className={styles.photo} key={itemInd}>
            <img
              className={
                this.props.num[this.props.index] === itemInd
                  ? styles.gallery
                  : styles.galleryInvisible
              }
              src={this.props.cart[this.props.index].gallery[itemInd]}
              alt="gallery"
            />
          </li>
        ))}

        <div className={styles.rightArrowBox}>
          {this.props.cart[this.props.index].gallery.length > 1 ? (
            <img
              onClick={() => {
                let newArr = [...this.props.num];
                let a = this.props.num[this.props.index] + 1;
                if (a < this.props.cart[this.props.index].gallery.length) {
                  newArr.splice(this.props.index, 1);
                  newArr.splice(this.props.index, 0, a);
                  this.props.changePhotos(newArr);
                }
              }}
              className={styles.rightArrow}
              src={rightArrow}
              alt="right"
            />
          ) : null}
        </div>
      </ul>
    );
  }
}

export default PhotosSlider;
