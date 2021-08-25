import React from "react";
import Product from "../src/components/Products.js";
import data from "./data.json";
import Filter from "../src/components/filter";
import Cart from "./components/Cart.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems:localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : [],
    };
  }
  createOrder=(order)=>{
    alert('need to save to DB');
  }
  removeFromCart = (product)=>{
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems:cartItems.filter(x=>x._id !== product._id)})
    
  }
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({
      cartItems
    });
    localStorage.setItem("cartItems",JSON.stringify(this.state.cartItems));
  };
  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  };
  filterProducts = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        products: data.products,
      });
    }
    this.setState({
      size: event.target.value,
      products: data.products.filter(
        (product) => product.availableSizes.indexOf(event.target.value) >= 0
      ),
    });
  };
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shooping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Product products={this.state.products}
              addToCart={this.addToCart}></Product>
            </div>
            <div className="sidebar">
              <Cart createOrder={this.createOrder} cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} />
            </div>
          </div>
        </main>
        <footer>All right reserved.</footer>
      </div>
    );
  }
}

export default App;
