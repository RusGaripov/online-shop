import "./App.css";
import React, { Component } from "react";
//import Navbar from "./components/Navbar/Navbar";
import WithRouterComponent from "./components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Clothes from "./components/Categories/Clothes";
import Tech from "./components/Categories/Tech";
import All from "./components/Categories/All";
import ProductPage from "./components/Categories/ProductPage/ProductPage";
import Cart from "./components/Categories/Cart/Cart";

export class App extends Component {
  render() {
    return (
      <div>
        {/*   <Navbar />*/}
        <WithRouterComponent />
        <Switch>
          <Route path="/clothes" component={Clothes} />
          <Route path="/tech" component={Tech} />
          <Route exact path="/" component={All} />
          <Route exact path="/one/:id" component={ProductPage} />
          <Route path="/userCart" component={Cart} />
        </Switch>
      </div>
    );
  }
}

export default App;
