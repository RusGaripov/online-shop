import React, { PureComponent } from "react";
import styles from "./Navbar.module.css";
import arrowDown from "../../images/arrowDown.svg";
import USD from "../../images/USD.png";
import GBP from "../../images/GBP.png";
import AUD from "../../images/AUD.png";
import JPY from "../../images/JPY.png";
import RUB from "../../images/RUB.png";
import { connect } from "react-redux";
import { toggleCurrencyMenu } from "../../store/actions/toggleCurrencyMenuActions";
import { toggleCartInMenu } from "../../store/actions/toggleCartInMenuActions";
import { getCurrency } from "../../store/actions/myCurrencyActions";

export class CurrencyList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      choosenCurrency: 0,
      currencyList: ["USD", "GBP", "AUD", "JPY", "RUB"],
      curSymbols: [USD, GBP, AUD, JPY, RUB],
    };
  }
  handleClickCurrencyList = () => {
    if (
      this.props.openedCurrencyList === false &&
      this.props.openedCart === false
    ) {
      this.props.toggleCurrencyMenu(true);
    } else {
      this.props.toggleCurrencyMenu(false);
    }
  };
  handleClickCurrency = (e) => {
    this.props.getCurrency(e.target.getAttribute("value"));
    this.setState({
      choosenCurrency: e.target.getAttribute("value"),
    });
    this.props.toggleCurrencyMenu(false);
  };

  render() {
    return (
      <div className={styles.optionsIcons}>
        <div
          onClick={this.handleClickCurrencyList}
          className={styles.choiceOfCurrency}
        >
          <img
            src={this.state.curSymbols[this.state.choosenCurrency]}
            alt="currencyIcon"
            className={styles.currency}
          />
          <img src={arrowDown} alt="arrowDown" className={styles.arrowDown} />
        </div>

        {this.props.openedCurrencyList && (
          <ul className={styles.currency__choose}>
            {this.state.currencyList.map((cur, index) => (
              <li
                key={index}
                onClick={this.handleClickCurrency}
                value={index}
                className={styles.currencyList__item}
              >
                <img
                  id={index}
                  src={this.state.curSymbols[index]}
                  alt="currencySymbol"
                />

                {cur}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.myCurrencyReducer.currency,
  openedCurrencyList: state.toggleCurrencyListReducer.openedCurrencyList,
  openedCart: state.toggleCartInMenuReducer.openedCart,
});

export default connect(mapStateToProps, {
  toggleCurrencyMenu,
  toggleCartInMenu,
  getCurrency,
})(CurrencyList);
