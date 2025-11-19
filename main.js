document.addEventListener("DOMContentLoaded", function () {
  const quantityInput = document.getElementById("quantity");
  const typeRadios = document.querySelectorAll('input[name="type"]');
  const optionSelect = document.getElementById("option");
  const propertyCheckbox = document.getElementById("prop");
  const optionsDiv = document.getElementById("optionsDiv");
  const propertyDiv = document.getElementById("propertyDiv");
  const errorDiv = document.getElementById("error");
  const resultDiv = document.getElementById("result");

  function updateFormVisibility() {
    const type2 = document.querySelector('input[value="2"]:checked') !== null;
    const type3 = document.querySelector('input[value="3"]:checked') !== null;
    optionsDiv.style.display = type2 ? "block" : "none";
    propertyDiv.style.display = type3 ? "block" : "none";
  }

  function calculate() {
    const qty = quantityInput.value.trim();
    errorDiv.textContent = "";
    resultDiv.textContent = "";

    if (qty === "") {
      return;
    }

    if (!/^\d+$/.test(qty)) {
      errorDiv.textContent = "Введите целое положительное число!";
      return;
    }

    const quantity = parseInt(qty, 10);
    let price = 0;

    if (document.querySelector('input[value="1"]:checked')) {
      price = 100;
    } else if (document.querySelector('input[value="2"]:checked')) {
      price = 150 + parseInt(optionSelect.value, 10);
    } else if (document.querySelector('input[value="3"]:checked')) {
      price = 200;
      if (propertyCheckbox.checked) {
        price += 75;
      }
    }

    const total = price * quantity;
    resultDiv.textContent = `Стоимость заказа: ${total} руб.`;
  }

  quantityInput.addEventListener("input", calculate);

  typeRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      updateFormVisibility();
      calculate();
    });
  });

  optionSelect.addEventListener("change", calculate);
  propertyCheckbox.addEventListener("change", calculate);

  updateFormVisibility();
  calculate();
});
