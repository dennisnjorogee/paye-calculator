import housingLevyRates from "../../config/housing-levy-rates.json" with { type: "json" };

export const calculateHousingLevy = (grossPay) => {
  const HOUSING_LEVY_RATE = housingLevyRates["housing-levy-rate"];
  return Number((grossPay * HOUSING_LEVY_RATE).toFixed(2));
};
