document.addEventListener("DOMContentLoaded", () => {
  const nssfFormSection = document.getElementById("nssf-form-section");
  const nssfForm = document.getElementById("nssf-form");
  const resetBtn = document.getElementById("reset-btn");
  const resultsSection = document.getElementById("results");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  let successNotification;
  let errorNotification;

  const grossSalaryCell = document.getElementById("gross-salary");
  const nssfCell = document.getElementById("nssf");

  const valueOutputs = [grossSalaryCell, nssfCell];

  const API_URL = document.body.dataset.apiUrl;
  const serviceCode = "NSSF";

  const formatCurrency = (amount) => {
    return `KES ${parseFloat(amount).toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (nssfForm) {
    nssfForm.addEventListener("submit", function (e) {
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
          successNotification = "✓ Results loaded successfully";
          return response.json();
        })
        .then((data) => {
          successMessage.innerHTML = successNotification;
          grossSalaryCell.textContent = formatCurrency(data.data.grossPay);
          nssfCell.textContent = formatCurrency(data.data.nssf || 0);

          if (nssfFormSection) nssfFormSection.setAttribute("hidden", "");
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
      if (nssfFormSection) nssfFormSection.removeAttribute("hidden");
      nssfForm.reset();
    });
  }
});
