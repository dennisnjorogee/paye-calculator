import apiService from "../services/api.service.js";
import resultCodes from "../config/result-codes.js";

const calculator = (req, res) => {
  const grossPay = req.grossPay;
  const serviceCode = req.serviceCode;

  const data = apiService.calculator(grossPay, serviceCode);

  res.status(200).json({
    status: "success",
    resultCode: resultCodes.SUCCESS.code,
    message: resultCodes.SUCCESS.message,
    data,
  });
};

export default { calculator };
