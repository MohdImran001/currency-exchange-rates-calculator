const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

//fixer-service
const {
  getRates,
  getSymbols,
  getHistoricalRate,
} = require("../lib/fixer-service");
const { convertCurrency } = require("../lib/free-currency-service");

router.get("/rates", async (req, res, next) => {
  try {
    const data = await getRates();
    // console.log(data);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/symbols", async (req, res, next) => {
  try {
    const data = await getSymbols();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/convert", bodyParser.json(), async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const data = await convertCurrency(from, to);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/historical", bodyParser.json(), async (req, res, next) => {
  try {
    const { date } = req.body;
    const data = await getHistoricalRate(date);
    res.status(200).json(data);
  } catch (error) {
    next(err);
  }
});

module.exports = router;
