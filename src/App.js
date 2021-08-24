import React from "react";
import Product from "../src/components/Products.js";
import data from "./data.json";

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shooping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Product products={this.state.products}></Product>
            </div>
            <div className="sidebar">
              Cart Items
            </div>
          </div>
        </main>
        <footer>All right reserved.</footer>
      </div>
    );
  }
}

export default App;
