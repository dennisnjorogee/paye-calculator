document.addEventListener("DOMContentLoaded", () => {
  const housingLevyFormSection = document.getElementById(
    "housing-levy-form-section",
  );
  const housingLevyForm = document.getElementById("housing-levy-form");
  const resetBtn = document.getElementById("reset-btn");
  const resultsSection = document.getElementById("results");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  let successNotification;
  let errorNotification;

  const grossSalaryCell = document.getElementById("gross-salary");
  const housingLevyCell = document.getElementById("housing-levy");

  const valueOutputs = [grossSalaryCell, housingLevyCell];

  const API_URL = document.body.dataset.apiUrl;
  const serviceCode = "HOUSINGLEVY";

  const formatCurrency = (amount) => {
    return `KES ${parseFloat(amount).toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (housingLevyForm) {
    housingLevyForm.addEventListener("submit", function (e) {
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
              throw new Error(errorBody.message);
            });
          }
          return response.json();
        })
        .then((data) => {
          successNotification = "✓ " + data.message;
          successMessage.innerHTML = successNotification;
          grossSalaryCell.textContent = formatCurrency(data.data.grossPay);
          housingLevyCell.textContent = formatCurrency(data.data.housingLevy);

          if (housingLevyFormSection)
            housingLevyFormSection.setAttribute("hidden", "");
          if (resultsSection) resultsSection.removeAttribute("hidden");
          if (errorMessage) errorMessage.setAttribute("hidden", "");
        })
        .catch((error) => {
          if (errorMessage) errorMessage.removeAttribute("hidden");
          errorNotification = error.message;
          console.error("Calculation transmission failed:", error);
          errorMessage.innerHTML = errorNotification;
        });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (resultsSection) resultsSection.setAttribute("hidden", "");
      if (housingLevyFormSection)
        housingLevyFormSection.removeAttribute("hidden");
      housingLevyForm.reset();
    });
  }
});
