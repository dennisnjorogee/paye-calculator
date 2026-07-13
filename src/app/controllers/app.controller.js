const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_SERVER_URL
    : process.env.DEV_SERVER_URL || "http://localhost:3000";

// internal website controllers
const payeCalc = (req, res) => {
  res.render("paye/index", { API_URL: apiUrl });
};

const nssfCalc = (req, res) => {
  res.render("nssf/index", { API_URL: apiUrl });
};

const shifCalc = (req, res) => {
  res.render("shif/index", { API_URL: apiUrl });
};

const housingLevyCalc = (req, res) => {
  res.render("housing-levy/index", { API_URL: apiUrl });
};

const docs = (req, res) => {
  res.render("docs/index");
};

export default {
  payeCalc,
  nssfCalc,
  shifCalc,
  housingLevyCalc,
  docs,
};
