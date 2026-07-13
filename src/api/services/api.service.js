import { calculateSHIF } from "../modules/SHIF/shif.js";
import { calculateNSSF } from "../modules/NSSF/nssf.js";
import { calculateHousingLevy } from "../modules/housingLevy/housingLevy.js";
import { calculatePAYE } from "../modules/PAYE/paye.js";
import { AppError } from "../utils/error.js";
import resultCodes from "../config/result-codes.js";

const calculator = (grossPay, serviceCode) => {
  switch (serviceCode) {
    case "NETPAY": {
      const nssf = calculateNSSF(grossPay);
      const shif = calculateSHIF(grossPay);
      const housingLevy = calculateHousingLevy(grossPay);

      const preTaxDeductions = nssf + shif + housingLevy;
      const taxableIncome = grossPay - preTaxDeductions;

      const { payeTotal, incomeTax, personalRelief } =
        calculatePAYE(taxableIncome);
      const totalDeductions = preTaxDeductions + payeTotal;
      const netPay = taxableIncome - payeTotal;

      return {
        serviceCode,
        grossPay,
        deductions: {
          preTax: {
            nssf,
            shif,
            housingLevy,
            total: preTaxDeductions,
          },
          paye: {
            taxableIncome,
            incomeTax,
            personalRelief,
            amount: payeTotal,
          },

          total: totalDeductions,
        },
        netPay,
      };
    }
    case "NSSF":
      return { serviceCode, grossPay, nssf: calculateNSSF(grossPay) };

    case "SHIF":
      return { serviceCode, grossPay, shif: calculateSHIF(grossPay) };

    case "HOUSINGLEVY":
      return {
        serviceCode,
        grossPay,
        housingLevy: calculateHousingLevy(grossPay),
      };

    default:
      throw new AppError(
        resultCodes.INVALID_SERVICE_CODE.code,
        resultCodes.INVALID_SERVICE_CODE.statusCode,
        resultCodes.INVALID_SERVICE_CODE.message,
        `Invalid service code: ${serviceCode}`,
        "serviceCode",
      );
  }
};

export default { calculator };
