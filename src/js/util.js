const errorTemplate = require("../views/error");
const ratesTemplate = require("../views/rates-template");

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
});

const app = $("#app");

const showError = (error, app, error_template) => {
  let title, message;
  if (error.response) {
    title = error.response.data.title;
    message = error.response.data.message;
  } else {
    title = "Error";
    message = "Something Wrong Happened";
  }
  const html = error_template({ color: "red", title, message });
  app.html(html);
};

// Perform POST request, calculate and display conversion results
const getConversionResults = async () => {
  // Extract form data
  const from = $("#from").val();
  const to = $("#to").val();
  const amount = $("#amount").val();
  // Send post data to Express(proxy) server
  try {
    const response = await api.post("/convert", { from, to });
    const { rate } = response.data;
    const result = rate * amount;
    $("#result").html(`${to} ${result}`);
  } catch (error) {
    const error_template = Handlebars.compile(errorTemplate.html());
    showError(err, app, error_template);
  } finally {
    $("#result-segment").removeClass("loading");
  }
};

// Handle Convert Button Click Event
const convertRatesHandler = () => {
  if ($(".ui.form").form("is valid")) {
    // hide error message
    $(".ui.error.message").hide();
    // Post to Express server
    $("#result-segment").addClass("loading");
    getConversionResults();
    // Prevent page from submitting to server
    return false;
  }
  return true;
};

const getHistoricalRates = async () => {
  const date = $("#date").val();
  try {
    const response = await api.post("/historical", { date });
    const { base, rates } = response.data;

    const rates_template = Handlebars.compile(ratesTemplate.html());
    const html = rates_template({ base, date, rates });
    $("#historical-table").html(html);
  } catch (err) {
    console.log(err);
    const error_template = Handlebars.compile(errorTemplate.html());
    showError(err, app, error_template);
  } finally {
    $(".segment").removeClass("loading");
  }
};

//Handle Historical Button Click Event
const historicalRatesHandler = () => {
  if ($(".ui.form").form("is valid")) {
    // hide error message
    $(".ui.error.message").hide();
    // Indicate loading status
    $(".segment").addClass("loading");
    getHistoricalRates();
    // Prevent page from submitting to server
    return false;
  }
  return true;
};

module.exports = {
  api: api,
  convertRatesHandler: convertRatesHandler,
  historicalRatesHandler: historicalRatesHandler,
  showError: showError,
};
