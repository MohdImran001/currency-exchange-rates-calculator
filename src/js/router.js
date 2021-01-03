const errorTemplate = require("../views/error");
const ratesTemplate = require("../views/rates-template");
const exchangeTemplate = require("../views/exchange-template");
const historicalTemplate = require("../views/historical-template");

const {
  api,
  showError,
  convertRatesHandler,
  historicalRatesHandler,
} = require("./util");

const app = $("#app");

const router = new Router({
  mode: "history",
  page404: (path) => {
    const error = Handlebars.compile(errorTemplate.html());
    const html = error({
      color: "yellow",
      title: "Error 404 - Page Not Found",
      message: `The path /${path} doesnot exists`,
    });
    app.html(html);
  },
});

router.add("/", async () => {
  //display loader
  const rates_template = Handlebars.compile(ratesTemplate.html());
  let html = rates_template();
  app.html(html);

  //FETCH DATA
  try {
    const response = await api.get("/rates");
    const { base, date, rates } = response.data;
    console.log(base, date, rates);
    html = rates_template({ base, date, rates });
    app.html(html);
  } catch (err) {
    const error_template = Handlebars.compile(errorTemplate.html());
    showError(err, app, error_template);
  } finally {
    $(".loading").removeClass("loading");
  }
});

router.add("/exchange", async () => {
  const exchange_template = Handlebars.compile(exchangeTemplate.html());
  let html = exchange_template();
  app.html(html);

  try {
    const response = await api.get("/symbols");
    const { symbols } = response.data;
    html = exchange_template({ symbols });
    app.html(html);

    $(".loading").removeClass("loading");

    // Validate Form Inputs
    $(".ui.form").form({
      fields: {
        from: "empty",
        to: "empty",
        amount: "decimal",
      },
    });

    // Specify Submit Handler
    $(".submit").click(convertRatesHandler);
  } catch (err) {
    const error_template = Handlebars.compile(errorTemplate.html());
    showError(err, app, error_template);
  }
});

router.add("/historical", async () => {
  const historical_template = Handlebars.compile(historicalTemplate.html());
  const html = historical_template();
  app.html(html);

  // Activate Date Picker
  $("#calendar").calendar({
    type: "date",
    formatter: {
      //format date to yyyy-mm-dd
      date: (date) => new Date(date).toISOString().split("T")[0],
    },
  });
  // Validate Date input
  $(".ui.form").form({
    fields: {
      date: "empty",
    },
  });
  $(".submit").click(historicalRatesHandler);
});

module.exports = router;
