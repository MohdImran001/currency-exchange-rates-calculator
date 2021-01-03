require("dotenv").config();
const axios = require("axios");

const symbols = process.env.SYMBOLS || "EUR,USD,GBP";

// Axios Client declaration
const api = axios.create({
  baseURL: "http://data.fixer.io/api",
  timeout: +process.env.TIMEOUT || 5000,
});

// Generic GET request function
const get = async (url) => {
  try {
    const response = await api.get(url);
    const { data } = response;
    if (data.success) {
      return data;
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getRates: () =>
    get(
      `/latest?access_key=${process.env.FIXER_API_KEY}&symbols=${symbols}&base=EUR`
    ),
  getSymbols: () => get(`/symbols?access_key=${process.env.FIXER_API_KEY}`),
  getHistoricalRate: (date) =>
    get(
      `/${date}?access_key=${process.env.FIXER_API_KEY}&symbols=${symbols}&base=EUR`
    ),
};
