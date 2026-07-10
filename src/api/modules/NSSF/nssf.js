import nssfRates from "../../config/nssf-rates.json" with { type: "json" };

export const calculateNSSF = (grossPay) => {
  //constants
  const NSSF_RATE = nssfRates["nssf-rate"];
  const NSSF_LOWER_EARNINGS_LIMIT = nssfRates["nssf-lower-earnings-limit"];
  const NSSF_UPPER_EARNINGS_LIMIT = nssfRates["nssf-upper-earnings-limit"];

  // tier one
  const tierOneEarnings = Math.min(grossPay, NSSF_LOWER_EARNINGS_LIMIT);
  const tierOneContributions = tierOneEarnings * NSSF_RATE;

  // tier two
  const tierTwoEarnings = Math.min(
    Math.max(grossPay - NSSF_LOWER_EARNINGS_LIMIT, 0),
    NSSF_UPPER_EARNINGS_LIMIT - NSSF_LOWER_EARNINGS_LIMIT,
  );
  const tierTwoContributions = tierTwoEarnings * NSSF_RATE;

  const nssf = tierOneContributions + tierTwoContributions;

  return Number(nssf.toFixed(2));
};
