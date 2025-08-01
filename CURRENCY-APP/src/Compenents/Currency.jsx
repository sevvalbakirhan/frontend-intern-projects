import React, { useState } from 'react'
import '../CSS/currency.css';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import axios from 'axios';
let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_KEY = "fca_live_fpIW8t3qCZcJSzz648u83pP6g534IZzZHj9hJYhq";

function Currency() {
    const [amount, setAmount] = useState();
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('TRY');
    const [result, setResult] = useState(0);

    const exchange = async () => {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`); //url 
        const result = (response.data.data[toCurrency] * amount).toFixed(2);
        setResult(result);
    }

    return (
        <div className='currency-div'>
            <h3>DÖVİZ KURU UYGULAMASI</h3>
            <div className='currency-row'>
                <input
                    type="number"
                    className='amount'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <select
                    className='from-currency-option'
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="TRY">TRY</option>
                </select>
                <FaRegArrowAltCircleRight className='icon' />
                <select
                    className='to-currency-option'
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    <option value="TRY">TRY</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                </select>
                <input
                    type="number"
                    className='result'
                    value={result}
                    readOnly
                />
            </div>
            <div>
                <button className='exchange-button' onClick={exchange}> Çevir  </button>
            </div>
        </div>
    )
}

export default Currency;
