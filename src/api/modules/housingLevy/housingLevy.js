import housingLevyRates from "../../config/housing-levy-rates.json" with { type: "json" };

export const calculateHousingLevy = (grossPay) => {
  // constants
  const HOUSING_LEVY_RATE = housingLevyRates["housing-levy-rate"];

  const housingLevy = grossPay * HOUSING_LEVY_RATE;

  return Number(housingLevy.toFixed(2));
};
