import apiService from "../services/api.service.js";

const calculator = (req, res) => {
  const grossPay = req.grossPay;
  const serviceCode = req.serviceCode;

  const data = apiService.calculator(grossPay, serviceCode);

  res.status(200).json({
    status: "success",
    data,
  });
};

export default { calculator };
