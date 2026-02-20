document.getElementById("salaryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const grossSalary = document.getElementById("gross").value;

  if (Number(grossSalary < 0)) {
    displayError();
    return;
  }

  const payslip = calculatePayslip(Number(grossSalary));

  renderPayslip(payslip);
});

const RATES = {
  NSSF_TIER_1_LIMIT: 9000,
  NSSF_TIER_2_LIMIT: 108000,
  NSSF_RATE: 0.06,
  NSSF_MAX: 6480,

  SHIF_RATE: 0.0275,
  SHIF_MIN: 300,

  HOUSING_LEVY_RATE: 0.015,

  PERSONAL_RELIEF: 2400,
};

// calculate nssf
function calculateNSSF(grossSalary) {
  const tier1 = Math.min(grossSalary, RATES.NSSF_TIER_1_LIMIT);
  const tier2 = Math.min(
    Math.max(grossSalary - RATES.NSSF_TIER_1_LIMIT, 0),
    RATES.NSSF_TIER_2_LIMIT - RATES.NSSF_TIER_1_LIMIT,
  );

  const nssf = tier1 * RATES.NSSF_RATE + tier2 * RATES.NSSF_RATE;

  return Math.min(nssf, RATES.NSSF_MAX);
}

//calculate shif
function calculateSHIF(grossSalary) {
  const shif = Math.max(grossSalary * RATES.SHIF_RATE, RATES.SHIF_MIN);

  return shif;
}

// calculate housing levy
function calculateHousingLevy(grossSalary) {
  const housingLevy = grossSalary * RATES.HOUSING_LEVY_RATE;

  return housingLevy;
}

// calculate paye
function calculatePAYE(taxableIncome) {
  const bands = [
    { limit: 24000, rate: 0.1 },
    { limit: 8333, rate: 0.25 },
    { limit: 467667, rate: 0.3 },
    { limit: 300000, rate: 0.325 },
    { limit: Infinity, rate: 0.35 },
  ];

  let remainingIncome = taxableIncome;
  let tax = 0;

  for (const band of bands) {
    if (remainingIncome <= 0) break;

    const taxableAmount = Math.min(remainingIncome, band.limit);
    tax += taxableAmount * band.rate;
    remainingIncome -= taxableAmount;
  }

  return tax;
}

// main function
function calculatePayslip(grossSalary, insuranceRelief = 0) {
  const nssf = calculateNSSF(grossSalary);
  const shif = calculateSHIF(grossSalary);
  const housingLevy = calculateHousingLevy(grossSalary);

  const taxableIncome = grossSalary - (nssf + shif + housingLevy);

  const grossPAYE = calculatePAYE(taxableIncome);

  const netPAYE = Math.max(grossPAYE - RATES.PERSONAL_RELIEF, 0);

  const totalDeductions = nssf + shif + housingLevy + netPAYE;

  const netSalary = grossSalary - totalDeductions;

  return {
    grossSalary,
    grossPAYE,
    nssf,
    shif,
    housingLevy,
    taxableIncome,
    grossPAYE,
    PERSONAL_RELIEF: RATES.PERSONAL_RELIEF,
    insuranceRelief,
    netPAYE,
    totalDeductions,
    netSalary,
  };
}

function formatKES(amount) {
  return `KES ${amount.toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function renderPayslip(data) {
  document.getElementById("grossOut").textContent = formatKES(data.grossSalary);
  document.getElementById("nssfOut").textContent = formatKES(data.nssf);
  document.getElementById("shifOut").textContent = formatKES(data.shif);
  document.getElementById("housingOut").textContent = formatKES(
    data.housingLevy,
  );
  document.getElementById("taxableOut").textContent = formatKES(
    data.taxableIncome,
  );
  document.getElementById("incomeTaxOut").textContent = formatKES(
    data.grossPAYE,
  );
  document.getElementById("personalReliefOut").textContent =
    "-" + formatKES(data.PERSONAL_RELIEF);
  document.getElementById("payeOut").textContent = formatKES(data.netPAYE);
  document.getElementById("deductionsOut").textContent = formatKES(
    data.totalDeductions,
  );
  document.getElementById("netOut").textContent = formatKES(data.netSalary);

  document.getElementById("results").style.display = "block";
}

function renderMonthYear() {
  const now = new Date();
  const monthYear = now.toLocaleString("en-KE", {
    month: "long",
    year: "numeric",
  });
  document.getElementById("monthYear").textContent = monthYear;
}
