document.getElementById("paye-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const grossPayInput = parseFloat(document.getElementById("gross-pay").value);
  const serviceCode = "NETPAY";
  const API_URL = document.body.dataset.apiUrl;

  const payload = {
    serviceCode,
    grossPay: grossPayInput,
  };

  const resultsSection = document.getElementById("results");
  const grossSalaryCell = document.getElementById("gross-salary");
  const nssfCell = document.getElementById("nssf");
  const shifCell = document.getElementById("shif");
  const housingLevyCell = document.getElementById("housing-levy");
  const taxableIncomeCell = document.getElementById("taxable-income");
  const payeCell = document.getElementById("paye");
  const totalDeductionsCell = document.getElementById("deductions");
  const netSalaryCell = document.getElementById("net-salary");

  const formatCurrency = (amount) => {
    return `KES ${parseFloat(amount).toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  fetch(`${API_URL}/api/v1/bulk-calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorBody) => {
          throw new Error(errorBody.message || `HTTP error ${response.status}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      grossSalaryCell.textContent = formatCurrency(data.data.earnings.grossPay);
      nssfCell.textContent = formatCurrency(
        data.data.preTaxDeductions.nssf || 0,
      );
      shifCell.textContent = formatCurrency(
        data.data.preTaxDeductions.shif || 0,
      );
      housingLevyCell.textContent = formatCurrency(
        data.data.preTaxDeductions.housingLevy || 0,
      );
      taxableIncomeCell.textContent = formatCurrency(
        data.data.payeDeductions.taxableIncome || 0,
      );
      payeCell.textContent = formatCurrency(
        data.data.payeDeductions.payeTotal || 0,
      );
      totalDeductionsCell.textContent = formatCurrency(
        data.data.totalDeductions || 0,
      );
      netSalaryCell.textContent = formatCurrency(data.data.netPay || 0);
      resultsSection.removeAttribute("hidden");
    })
    .catch((error) => {
      console.error("Calculation transmission failed:", error);
      alert(
        error.message ||
          "An error occurred while communicating with the calculator service.",
      );
    });
});
