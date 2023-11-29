import React, { useState, useEffect } from "react";
import "./CreditCardForm.css"; // Import your CSS file

const CreditCardForm = () => {
  const [logo, setLogo] = useState(""); // State for the card logo
  // Add more state variables as needed

  // Your existing JS logic can be refactored into functions here
  const [isCardExited, setisCardExited] = useState(false);

  const handleButtonClick = () => {
    setisCardExited(true);
  };
  useEffect(() => {
    // Your existing JavaScript logic from script.js can go here
    const expirationSelect = document.getElementById("expiration-year");
    const logo = document.querySelector("[data-logo]");
    const currentYear = new Date().getFullYear();

    for (let i = currentYear; i < currentYear + 10; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.innerText = i;
      expirationSelect.appendChild(option);
    }

    const isConnectedInput = (input) => {
      const parent = input.closest("[data-connected-inputs]");
      return input.matches("input") && parent != null;
    };

    const cardInputs = document.querySelectorAll(
      "[data-connected-inputs] input"
    );

    cardInputs.forEach((input, index, inputs) => {
      input.addEventListener("input", (e) => {
        if (e.target.value.length === e.target.maxLength) {
          if (index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
        }
      });

      input.addEventListener("keydown", (e) => {
        const key = e.key;
        if (key === "Backspace" && e.target.value === "" && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });

    document.addEventListener("keydown", (e) => {
      const input = e.target;
      const key = e.key;
      if (!isConnectedInput(input)) return;

      switch (
        key
        // ... (rest of your keydown logic)
      ) {
      }
    });

    document.addEventListener("paste", (e) => {
      const input = e.target;
      const data = e.clipboardData.getData("text");

      if (!isConnectedInput(input)) return;
      if (!data.match(/^[0-9]+$/)) return e.preventDefault();

      e.preventDefault();
      onInputChange(input, data);
    });

    function onInputChange(input, newValue) {
      // Your existing onInputChange function
    }

    function updateInputValue(input, extraValue, start = 0, end = 0) {
      // Your existing updateInputValue function
    }

    function focusInput(input, dataLength) {
      // Your existing focusInput function
    }
  }, []); // Added an empty dependency array to ensure useEffect runs only once

  return (
    <div className={`credit-card ${isCardExited ? "card-exit" : ""}`}>
      <form className="credit-card">
        <div className="front">
          <div className="card-data-row">
            <div className="brand-name">Fiserv</div>
            <img data-logo src="visa.svg" alt="Card Logo" className="logo" />
          </div>
          <fieldset className="form-group">
            <legend>Card Number</legend>
            <label htmlFor="cc-1">Card Number</label>
            <div
              data-connected-inputs
              className="cc-inputs horizontal-input-stack"
            >
              <input
                type="tel"
                maxLength="4"
                aria-label="Credit Card First 4 Digits"
                id="cc-1"
                required
                pattern="[0-9]{4}"
              />
              <input
                type="tel"
                maxLength="4"
                aria-label="Credit Card Second 4 Digits"
                required
                pattern="[0-9]{4}"
              />
              <input
                type="tel"
                maxLength="4"
                aria-label="Credit Card Third 4 Digits"
                required
                pattern="[0-9]{4}"
              />
              <input
                type="tel"
                maxLength="4"
                aria-label="Credit Card Last 4 Digits"
                required
                pattern="[0-9]{4}"
              />
            </div>
          </fieldset>
          <div className="input-row">
            <div className="form-group name-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" required autoComplete="off" />
            </div>
            <fieldset className="form-group">
              <legend>Expiration</legend>
              <label htmlFor="expiration-month">Expiration</label>
              <div className="horizontal-input-stack">
                <select
                  id="expiration-month"
                  aria-label="Expiration Month"
                  required
                >
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                  <option>05</option>
                  <option>06</option>
                  <option>07</option>
                  <option>08</option>
                  <option>09</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
                <select
                  id="expiration-year"
                  aria-label="Expiration Year"
                  required
                  data-expiration-year
                ></select>
              </div>
            </fieldset>
          </div>
        </div>
        <div className="back">
          <div className="stripe"></div>
          <div className="form-group cvc-group">
            <label htmlFor="cvc">CVV</label>
            <input
              className="cvc-input"
              type="tel"
              maxLength="3"
              id="cvc"
              required
            />
          </div>
        </div>
      </form>
      <button
        className="submit-button"
        type="submit"
        onClick={handleButtonClick}
      >
        Submit
      </button>
    </div>
  );
};

export default CreditCardForm;
