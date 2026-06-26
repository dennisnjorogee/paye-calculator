import { calculateNSSF } from "../modules/nssf.js";
import { calculateSHIF } from "../modules/shif.js";
import { calculateHousingLevy } from "../modules/housingLevy.js";
import { calculatePAYE } from "../modules/paye.js";

const calculateNetPay = (basicPay) => {
  // calculate nssf
  const nssf = calculateNSSF(basicPay);
  // calculate shif
  const shif = calculateSHIF(basicPay);
  // calculate housing levy
  const housingLevy = calculateHousingLevy(basicPay);

  // total deductions
  const totalDeductions = nssf + shif + housingLevy;

  // taxable income
  const taxableIncome = basicPay - totalDeductions;

  // paye , income tax, personal relief
  const { paye, incomeTax, personalRelief } = calculatePAYE(taxableIncome);

  const netPay = taxableIncome - paye;

  return {
    basicPay,
    nssf,
    shif,
    housingLevy,
    totalDeductions,
    taxableIncome,
    incomeTax,
    personalRelief,
    paye,
    netPay,
  };
};

export default { calculateNetPay };
