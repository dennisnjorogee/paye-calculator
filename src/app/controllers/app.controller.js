const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_SERVER_URL
    : process.env.DEV_SERVER_URL || "http://localhost:3000";

// internal website controllers
const home = (req, res) => {
  res.render("home/index", { API_URL: apiUrl });
};

const grossPayCalc = (req, res) => {
  res.render("gross/index");
};

const nssfCalc = (req, res) => {
  res.render("nssf/index", { API_URL: apiUrl });
};

const shifCalc = (req, res) => {
  res.render("shif/index");
};

const housingLevyCalc = (req, res) => {
  res.render("housing-levy/index");
};

const docs = (req, res) => {
  res.render("docs/index");
};

export default {
  home,
  grossPayCalc,
  nssfCalc,
  shifCalc,
  housingLevyCalc,
  docs,
};
