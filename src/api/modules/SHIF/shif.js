import shifRates from "../../config/shif-rates.json" with { type: "json" };

export const calculateSHIF = (grossPay) => {
  // constants
  const SHIF_RATE = shifRates["shif-rate"];
  const SHIF_MIN_CONTRIBUTION = shifRates["shif-min-contribution"];

  const shif = Math.max(grossPay * SHIF_RATE, SHIF_MIN_CONTRIBUTION);

  // return shif
  return Number(shif.toFixed(2));
};
