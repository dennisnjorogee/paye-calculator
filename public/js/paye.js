document.addEventListener("DOMContentLoaded", () => {
  const payeFormSection = document.getElementById("paye-form-section");
  const payeForm = document.getElementById("paye-form");
  const resetBtn = document.getElementById("reset-btn");
  const resultsSection = document.getElementById("results");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  let successNotification;
  let errorNotification;

  const grossSalaryCell = document.getElementById("gross-salary");
  const nssfCell = document.getElementById("nssf");
  const shifCell = document.getElementById("shif");
  const housingLevyCell = document.getElementById("housing-levy");
  const taxableIncomeCell = document.getElementById("taxable-income");
  const payeCell = document.getElementById("paye");
  const totalDeductionsCell = document.getElementById("deductions");
  const netSalaryCell = document.getElementById("net-salary");

  const valueOutputs = [
    grossSalaryCell,
    nssfCell,
    shifCell,
    housingLevyCell,
    taxableIncomeCell,
    payeCell,
    totalDeductionsCell,
  ];

  const API_URL = document.body.dataset.apiUrl;
  const serviceCode = "NETPAY";

  const formatCurrency = (amount) => {
    return `KES ${parseFloat(amount).toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (payeForm) {
    payeForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const grossPayInput = parseFloat(
        document.getElementById("gross-pay").value,
      );
      const payload = {
        serviceCode,
        grossPay: grossPayInput,
      };

      fetch(`${API_URL}/api/v1/calculator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorBody) => {
              throw new Error(
                errorBody.message || `HTTP error ${response.status}`,
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          successNotification = "✓ " + data.message;
          successMessage.innerHTML = successNotification;
          grossSalaryCell.textContent = formatCurrency(data.data.grossPay);
          nssfCell.textContent = formatCurrency(
            data.data.deductions.preTax.nssf,
          );
          shifCell.textContent = formatCurrency(
            data.data.deductions.preTax.shif,
          );
          housingLevyCell.textContent = formatCurrency(
            data.data.deductions.preTax.housingLevy,
          );
          taxableIncomeCell.textContent = formatCurrency(
            data.data.deductions.paye.taxableIncome,
          );
          payeCell.textContent = formatCurrency(
            data.data.deductions.paye.amount,
          );
          totalDeductionsCell.textContent = formatCurrency(
            data.data.deductions.total,
          );

          netSalaryCell.innerHTML = `<strong>${formatCurrency(data.data.netPay)}</strong>`;

          if (payeFormSection) payeFormSection.setAttribute("hidden", "");
          if (resultsSection) resultsSection.removeAttribute("hidden");
          if (errorMessage) errorMessage.setAttribute("hidden", "");
        })
        .catch((error) => {
          if (errorMessage) errorMessage.removeAttribute("hidden");
          errorNotification = error.message || "Something went wrong";
          console.error("Calculation transmission failed:", error);
          errorMessage.innerHTML = errorNotification;
        });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (resultsSection) resultsSection.setAttribute("hidden", "");
      if (payeFormSection) payeFormSection.removeAttribute("hidden");
      payeForm.reset();
    });
  }
});
