// ========== SELECT ITEMS ==========

const bill = document.getElementById("bill");
const people = document.getElementById("people");
const tipAmount = document.getElementById("tip-amount");
const total = document.getElementById("total");
const customTip = document.getElementById("tip");
const resetBtn = document.querySelector(".reset-btn");
const tipBtn = document.querySelectorAll(".tip__content");
const alertMsg = document.querySelector(".alert");

let billValue = null;
let tipValue = null;
let peopleValue = null;

// setup
window.addEventListener("DOMContentLoaded", reset);

// ========== EVENT LISTENERS ==========

bill.addEventListener("input", () => {
  billValue = bill.value;
  calculate();
});

people.addEventListener("input", () => {
  hideAlert();
  peopleValue = people.value;
  calculate();
});

tipBtn.forEach((button) => {
  button.addEventListener("click", () => {
    removeTipClicked();
    button.classList.add("tip__clicked");
    customTip.value = null;
    switch (button.innerText) {
      case "5%":
        tipValue = 5;
        break;
      case "10%":
        tipValue = 10;
        break;
      case "15%":
        tipValue = 15;
        break;
      case "25%":
        tipValue = 25;
        break;
      case "50%":
        tipValue = 50;
        break;
      default:
        break;
    }
    calculate();
  });
});

customTip.addEventListener("input", () => {
  removeTipClicked();
  tipValue = customTip.value;
  calculate();
});

resetBtn.addEventListener("click", () => {
  reset();
});

// ========== FUNCTIONS ==========

function calculate() {
  checkInput();
  activeResetBtn();
  if (billValue && tipValue && peopleValue) {
    // doing the math
    tipAmount.innerText = formatToCurrency(
      (billValue * tipValue) / 100 / peopleValue
    );
    total.innerText = formatToCurrency(
      billValue / peopleValue + (billValue * tipValue) / 100 / peopleValue
    );
    return;
  }

  tipAmount.innerText = "$0.00";
  total.innerText = "$0.00";
}

function reset() {
  bill.value = null;
  billValue = null;
  people.value = null;
  peopleValue = null;
  customTip.value = null;
  customTipValue = null;
  tipAmount.innerText = "$0.00";
  total.innerText = "$0.00";
  removeTipClicked();
  hideAlert();
  disableResetBtn();
}

function formatToCurrency(value) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function removeTipClicked() {
  tipBtn.forEach((button) => {
    button.classList.remove("tip__clicked");
  });
}

function showAlert() {
  alertMsg.textContent = "Can't be zero";
  people.style.outline = "solid 2px var(--clr-alert)";
}

function hideAlert() {
  alertMsg.textContent = "";
  people.style.outline = "";
  people.style.outlineColor = "var(--clr-primary)";
}

function checkInput() {
  if (peopleValue == null) {
    showAlert();
  } else if (peopleValue == 0) {
    showAlert();
  } else {
    hideAlert();
  }
}

// blocks the reset button
function disableResetBtn() {
  resetBtn.style.backgroundColor = "hsla(172, 67%, 45%, 0.3)";
  resetBtn.style.cursor = "auto";
  resetBtn.disable = true;
  resetBtn.addEventListener("mouseover", () => {
    resetBtn.style.backgroundColor = "hsla(172, 67%, 45%, 0.3)";
  });
  resetBtn.addEventListener("mouseout", () => {
    resetBtn.style.backgroundColor = "hsla(172, 67%, 45%, 0.3)";
  });
}

// unblocks the reset button
function activeResetBtn() {
  resetBtn.style.backgroundColor = "var(--clr-primary)";
  resetBtn.style.cursor = "pointer";
  resetBtn.disable = false;
  resetBtn.addEventListener("mouseover", () => {
    resetBtn.style.backgroundColor = "var(--clr-cyan-3)";
  });
  resetBtn.addEventListener("mouseout", () => {
    resetBtn.style.backgroundColor = "var(--clr-primary)";
  });
}
