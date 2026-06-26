import apiService from "../services/api.service.js";

const calculateNetPay = (req, res) => {
  const grossPay = req.grossPay;

  const netPay = apiService.calculateNetPay(grossPay);

  res.status(200).json({
    status: "success",
    payload: netPay,
  });
};

export default { calculateNetPay };
