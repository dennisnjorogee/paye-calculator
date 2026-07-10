import apiService from "../services/api.service.js";

const bulkCalculate = (req, res) => {
  const grossPay = req.grossPay;
  const serviceCode = req.serviceCode;

  const data = apiService.bulkCalculate(grossPay, serviceCode);

  res.status(200).json({
    status: "success",
    data,
  });
};

export default { bulkCalculate };
