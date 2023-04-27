import React, { useState, useEffect } from "react";
import "./CryptoForm.css";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import Payment from "../Payment";

const Main = () => {
  // const [currency, setCurrency] = useState("");
  // const [amount, setAmount] = useState("");
  // const [paymentMethod, setPaymentMethod] = useState("");
  // const [walletID, setWalletId] = useState("");
  // const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState("");

  const [data, setData] = useState({
    currency: "",
    paymentMethod: "",
    amount: "",
    walletID: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    console.log("1", data);
  };

  const navigate = useNavigate();

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/user/product";
      // const { data: res} = await axios.post(url, data);
      navigate("/");
      // console.log(res.message);

      const outcome = await axios.post(url, data);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
    setData("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <div className={styles.main_container}>
        <nav className={styles.navbar}>
          <h1>Crypto Dashboard</h1>
          <button className={styles.white_btn} onClick={handleLogout}>
            Logout
          </button>
        </nav>
        {/*
    {cryptoData.map((crypto, index) => (
      <div key={index}>
        <h2>{crypto.name}</h2>
        <p>{crypto.current_price}</p> */}

        <form onSubmit={handleSubmitPayment} className="crypto-form">
          <h2 className="crypto-form__title">Buy / Sell Cryptocurrency</h2>
          <h1>Current BTC Price</h1>

          <div className="crypto-form__group">
            <label htmlFor="currency" className="crypto-form__label">
              Currency
            </label>
            <select
              name="currency"
              value={data.currency}
              onChange={handleChange}
              className="crypto-form__select"
              required
            >
              <option value="">Select Coin</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
          </div>
          <div className="crypto-form__group">
            <label htmlFor="amount" className="crypto-form__label">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={data.amount}
              // onChange={(event) => setAmount(event.target.value)}
              onChange={handleChange}
              step="0.0001"
              placeholder="e.g. 0.5"
              className="crypto-form__input"
              required
            />
          </div>
          <div className="crypto-form__group">
            <label htmlFor="amount" className="crypto-form__label">
              WalletID
            </label>
            <input
              name="walletID"
              value={data.walletID}
              // onChange={(event) => setWalletId(event.target.value)}
              onChange={handleChange}
              step="0.0001"
              placeholder="xxxx"
              className="crypto-form__input"
              required
            />
          </div>

          <div className="crypto-form__group">
            <label htmlFor="payment-method" className="crypto-form__label">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={data.paymentMethod}
              // onChange={(event) => setPaymentMethod(event.target.value)}
              onChange={handleChange}
              className="crypto-form__select"
              required
            >
              <option value="">Select payment method</option>
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank-transfer">Bank Transfer</option>
            </select>
          </div>
          <button type="submit" className="crypto-form__button">
            Buy
          </button>
          <br />
          <button type="submit" className="crypto-form__button-sell">
            Sell
          </button>
        </form>
        <br />
        <br />
        <hr />
        <br />
        <Payment />
      </div>
    </>
  );
};

export default Main;
