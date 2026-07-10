import AppError from "../utils/error.js";

// bulk calculate endpoint validation middleware
const bulkCalculate = (req, res, next) => {
  if (
    req.body.grossPay === undefined ||
    req.body.grossPay === null ||
    req.body.grossPay === ""
  ) {
    throw new AppError("Gross pay is required", 400);
  }

  if (
    req.body.serviceCode === undefined ||
    req.body.serviceCode === null ||
    req.body.serviceCode === ""
  ) {
    throw new AppError("Service code is required", 400);
  }

  const grossPay = Number(req.body.grossPay);
  const serviceCode = req.body.serviceCode;

  if (isNaN(grossPay) || grossPay < 0) {
    throw new AppError("Invalid gross pay", 400);
  }

  req.grossPay = grossPay;
  req.serviceCode = serviceCode;

  next();
};

export default { bulkCalculate };
