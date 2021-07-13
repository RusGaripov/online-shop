import React, { Component } from "react";
import spinner from "./spinner.gif";
import styles from "./Spinner.module.css";

export class Spinner extends Component {
  render() {
    return (
      <div>
        <img src={spinner} alt="Загрузка" className={styles.spinner} />
      </div>
    );
  }
}

export default Spinner;
