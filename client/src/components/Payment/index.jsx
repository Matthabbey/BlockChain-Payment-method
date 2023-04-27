import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const [walletId, setWalletId] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const handleWalletIdChange = ({ currentTarget: input }) => {
  // 	setWalletId({ ...data, [input.name]: input.value });
  // };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/user/product";
      const data = await axios.post(url);
      navigate("/");
      console.log(data.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
    setWalletId("");
    setPaymentScreenshot("");
  };

  const handleWalletIdChange = (event) => {
    setWalletId(event.target.value);
  };

  const handlePaymentScreenshotChange = (event) => {
    setPaymentScreenshot(event.target.files[0]);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // submit the form data using AJAX, fetch or other methods
  // };

  return (
    <form className="crypto-form" onSubmit={handleSubmitPayment}>
      <label htmlFor="walletId" className="crypto-form__label">
        Wallet ID:
      </label>
      <input
        className="crypto-form__input"
        type="text"
        id="walletId"
        name="walletId"
        value={walletId}
        onChange={handleWalletIdChange}
      />
      <br />
      <br />
      <label htmlFor="paymentScreenshot" className="crypto-form__label">
        Payment Screenshot:
      </label>
      <input
        className="crypto-form__input"
        type="file"
        id="paymentScreenshot"
        name="paymentScreenshot"
        accept="image/*"
        onChange={handlePaymentScreenshotChange}
      />
      <br />
      <br />
      <button className="crypto-form__button" type="submit" value="Submit">
        Upload Payment
      </button>
    </form>
  );
};
export default Payment;
