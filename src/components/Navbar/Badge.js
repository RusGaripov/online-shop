import React, { Component } from "react";
import cardIcon from "../../images/cardIcon.png";
import styles from "./Navbar.module.css";
import { connect } from "react-redux";
import { toggleCartInMenu } from "../../store/actions/toggleCartInMenuActions";

export class Badge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myCard: false,
      choosenCurrency: 0,
      counters: [1],
      items: 0,
    };
  }

  handleClick = () => {
    if (this.props.openedCart === true) {
      this.props.toggleCartInMenu(false);
    } else {
      let sum = 0;
      for (let i = 0; i < this.props.cart.length; i++) {
        sum +=
          this.props.cart[i].prices[this.props.currency].amount *
          this.props.quantityArray[i];
      }
      this.props.toggleCartInMenu(true);
      this.setState({
        myCard: true,
        totalSum: sum,
      });
    }
    this.setState({
      counters: this.props.quantityArray,
    });

    let sum = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      sum += this.props.quantityArray[i];
    }
    this.setState({
      items: sum,
    });
  };

  render() {
    return (
      <div className={styles.cardBox} onClick={this.handleClick}>
        <img className={styles.cardIcon} src={cardIcon} alt="cardIcon" />
        {this.props.cart.length > 0 ? (
          <p className={styles.myBagItem}>{this.props.cart.length}</p>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  openedCart: state.toggleCartInMenuReducer.openedCart,
});

export default connect(mapStateToProps, {
  toggleCartInMenu,
})(Badge);
