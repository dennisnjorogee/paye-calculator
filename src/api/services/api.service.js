import { calculateSHIF } from "../modules/SHIF/shif.js";
import { calculateNSSF } from "../modules/NSSF/nssf.js";
import { calculateHousingLevy } from "../modules/housingLevy/housingLevy.js";
import { calculatePAYE } from "../modules/PAYE/paye.js";
import AppError from "../utils/error.js";

const bulkCalculate = (grossPay, serviceCode) => {
  // nssf only
  if (serviceCode === "NSSF") {
    const nssf = calculateNSSF(grossPay);
    return { serviceCode, grossPay, nssf };
  }

  // shif only
  if (serviceCode === "SHIF") {
    const shif = calculateSHIF(grossPay);
    return { serviceCode, grossPay, shif };
  }

  // housing levy only
  if (serviceCode === "HOUSINGLEVY") {
    const housingLevy = calculateHousingLevy(grossPay);
    return { serviceCode, grossPay, housingLevy };
  }

  // net pay
  if (serviceCode === "NETPAY") {
    // calculate nssf
    const nssf = calculateNSSF(grossPay);
    // calculate shif
    const shif = calculateSHIF(grossPay);
    // calculate housing levy
    const housingLevy = calculateHousingLevy(grossPay);

    // total pre tax deductions
    const preTaxDeductions = nssf + shif + housingLevy;

    // taxable income
    const taxableIncome = grossPay - preTaxDeductions;

    // paye , income tax, personal relief
    const { payeTotal, incomeTax, personalRelief } =
      calculatePAYE(taxableIncome);

    const totalDeductions = preTaxDeductions + payeTotal;

    const netPay = taxableIncome - payeTotal;

    return {
      serviceCode,
      earnings: {
        grossPay,
      },
      preTaxDeductions: {
        nssf,
        shif,
        housingLevy,
        totalPreTax: preTaxDeductions,
      },
      payeDeductions: {
        taxableIncome,
        incomeTax,
        personalRelief,
        payeTotal,
      },
      totalDeductions,
      netPay,
    };
  }

  throw new AppError("Invalid Service Code", 400);
};

export default { bulkCalculate };
