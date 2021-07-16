import React, { PureComponent } from "react";
import styles from "./ProductPage.module.css";
import {
  getOneTech,
  fetchDataList,
} from "../../../store/actions/categoryListActions";
import { getCurrency } from "../../../store/actions/myCurrencyActions";
import { addProduct, addQuantity } from "../../../store/actions/cartActions";
import { connect } from "react-redux";
import USD from "../../../images/USD.png";
import GBP from "../../../images/GBP.png";
import AUD from "../../../images/AUD.png";
import JPY from "../../../images/JPY.png";
import RUB from "../../../images/RUB.png";
import Spinner from "../../Spinner/Spinner";
import TechMainContent from "./ProductMainContent/TechMainContent";

export class ProductPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cur: [USD, GBP, AUD, JPY, RUB],
      myCur: null,
      currentPhoto: 0,
      z: this.props.pathname.toString(),
    };
  }

  componentDidMount() {
    this.props.getCurrency();
    // this.props.addProduct();
    this.setState({
      cur: [USD, GBP, AUD, JPY, RUB],
    });
  }

  componentDidUpdate() {
    if (this.state.cur[this.props.currency] !== this.state.myCur) {
      this.props.getCurrency();
      this.setState({
        myCur: this.state.cur[this.props.currency],
      });
    }
  }

  render() {
    if (this.props.oneTech) {
      return (
        <div
          className={
            this.props.openedCart || this.props.openedCurrencyList === true // used className instead of style prop
              ? styles.wrapperOpenedCart
              : styles.containerBox
          }
          onClick={() => {
            if (this.props.openedCart) this.props.toggleCartInMenu(false);
            if (this.props.openedCurrencyList) {
              this.props.toggleCurrencyMenu(false);
            }
          }}
        >
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <ul className={styles.gallery}>
                {this.props.oneTech.gallery.map((item, index) => (
                  <li
                    key={index}
                    value={index}
                    onClick={() => {
                      this.setState({
                        currentPhoto: index,
                      });
                    }}
                  >
                    <img src={item} key={index} alt="gallery" />
                  </li>
                ))}
              </ul>

              <TechMainContent
                oneTech={this.props.oneTech}
                openedCart={this.props.openedCart}
                openedCurrencyList={this.props.openedCurrencyList}
                currency={this.props.currency}
                currentPhoto={this.state.currentPhoto}
                myCur={this.state.myCur}
                cart={this.props.cart}
                addProduct={this.props.addProduct}
                addQuantity={this.props.addQuantity}
                quantityArray={this.props.quantityArray}
                z={this.state.z}
              />
            </div>
          </div>
        </div>
      );
    }

    return <Spinner />;
  }
}

const mapStateToProps = (state) => ({
  oneTech: state.categoryListReducer.oneTech,
  dataList: state.categoryListReducer.dataList,
  currency: state.myCurrencyReducer.currency,
  quantityArray: state.cartReducer.quantityArray,
  openedCart: state.toggleCartInMenuReducer.openedCart,
  openedCurrencyList: state.toggleCurrencyListReducer.openedCurrencyList,
  cart: state.cartReducer.cart,
});
export default connect(mapStateToProps, {
  getOneTech,
  fetchDataList,
  getCurrency,
  addProduct,
  addQuantity,
})(ProductPage);
