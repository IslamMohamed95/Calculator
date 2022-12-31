import React from "react";
import "./App.css";
import Calculator from "./Components/Calculator/Calculator.jsx";
import Footer from "./Components/Footer/Footer";
import Nav from "./Components/Nav/Nav";

function App() {
  return (
    <section className="App">
      <Nav />
      <Calculator />
      <Footer />
    </section>
  );
}

export default App;
