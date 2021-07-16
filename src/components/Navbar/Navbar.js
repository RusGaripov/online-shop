import React, { PureComponent } from "react";
import { NavLink, withRouter } from "react-router-dom";
import styles from "./Navbar.module.css";
import goBack from "../../images/goBack.png";
import { connect } from "react-redux";
import { toggleCartInMenu } from "../../store/actions/toggleCartInMenuActions";
import { toggleCurrencyMenu } from "../../store/actions/toggleCurrencyMenuActions";
import CurrencyList from "./CurrencyList";
import CartOverlay from "./CartOverlay";

export class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      array: ["clothes", "tech", "all"],
      myCard: false,
      myCur: null,
    };
  }

  componentDidMount() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div
          className={styles.header}
          onClick={() => {
            if (this.props.openedCart) {
              this.props.toggleCartInMenu(false);
            }
            if (this.props.openedCurrencyList) {
              this.props.toggleCurrencyMenu(false);
            }
          }}
        >
          <nav>
            <ul className={styles.nav}>
              {this.state.array !== []
                ? this.state.array.map((uniqueCategory, index) => (
                    <li key={index}>
                      {uniqueCategory !== "all" && (
                        <NavLink
                          to={"/" + uniqueCategory}
                          className={styles.category}
                          activeClassName={styles.activeLink}
                        >
                          {uniqueCategory}
                        </NavLink>
                      )}
                      {uniqueCategory === "all" && (
                        <NavLink
                          exact
                          to={"/"}
                          className={styles.category}
                          activeClassName={styles.activeLink}
                        >
                          {uniqueCategory}
                        </NavLink>
                      )}
                    </li>
                  ))
                : null}
            </ul>
          </nav>
          <img
            className={styles.goBack}
            onClick={this.props.history.goBack}
            src={goBack}
            alt="goBack"
          />
          <div className={styles.currencyAndCart}>
            <CurrencyList />
            <CartOverlay
              quantityArray={this.props.quantityArray}
              cartLength={this.props.cart.length}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
});
let WithRouterNavbar = withRouter(Navbar);

export default connect(mapStateToProps, {
  toggleCartInMenu,
  toggleCurrencyMenu,
})(WithRouterNavbar);
