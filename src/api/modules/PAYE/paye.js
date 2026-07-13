import payeRates from "../../config/paye-rates.json" with { type: "json" };

export const calculatePAYE = (taxableIncome) => {
  //constants
  const PERSONAL_RELIEF = payeRates["personal-tax-relief"];
  const TAX_BRACKETS = payeRates["tax-brackets"];

  let remainingIncome = taxableIncome;
  let incomeTax = 0;

  for (const bracket of TAX_BRACKETS) {
    if (remainingIncome <= 0) break;

    const taxableAmount = Math.min(remainingIncome, bracket.limit);
    incomeTax += taxableAmount * bracket.rate;
    remainingIncome -= taxableAmount;
  }

  incomeTax = Number(incomeTax.toFixed(2));

  return {
    incomeTax,
    personalRelief: PERSONAL_RELIEF,
    payeTotal: Number(Math.max(0, incomeTax - PERSONAL_RELIEF).toFixed(2)),
  };
};
