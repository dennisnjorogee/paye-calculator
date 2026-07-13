import { AppError } from "../utils/error.js";
import resultCodes from "../config/result-codes.js";

const calculator = (req, res, next) => {
  if (
    req.body.serviceCode === undefined ||
    req.body.serviceCode === null ||
    req.body.serviceCode === ""
  ) {
    throw new AppError(
      resultCodes.MISSING_REQUIRED_FIELD.code,
      resultCodes.MISSING_REQUIRED_FIELD.statusCode,
      resultCodes.MISSING_REQUIRED_FIELD.message,
      "Service code is required",
      "serviceCode",
    );
  }

  if (
    req.body.grossPay === undefined ||
    req.body.grossPay === null ||
    req.body.grossPay === ""
  ) {
    throw new AppError(
      resultCodes.MISSING_REQUIRED_FIELD.code,
      resultCodes.MISSING_REQUIRED_FIELD.statusCode,
      resultCodes.MISSING_REQUIRED_FIELD.message,
      "Gross pay is required",
      "grossPay",
    );
  }

  const grossPay = Number(req.body.grossPay);
  const serviceCode = req.body.serviceCode;

  if (isNaN(grossPay) || grossPay < 0) {
    throw new AppError(
      resultCodes.INVALID_GROSS_PAY.code,
      resultCodes.INVALID_GROSS_PAY.statusCode,
      resultCodes.INVALID_GROSS_PAY.message,
      `Invalid grossPay: ${req.body.grossPay}`,
      "grossPay",
    );
  }

  req.grossPay = grossPay;
  req.serviceCode = serviceCode;

  next();
};

export default { calculator };
