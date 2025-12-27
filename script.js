// ELEMENTS
const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const addBtn = document.getElementById("addBtn");
const notification = document.getElementById("notification");

// STATE
let isIncome = true;
let transactions = [];

// FORMAT
function formatINR(num) {
  return `₹${num.toFixed(2)}`;
}

// TOGGLE
incomeBtn.addEventListener("click", () => {
  isIncome = true;
  incomeBtn.classList.add("active");
  expenseBtn.classList.remove("active");
});

expenseBtn.addEventListener("click", () => {
  isIncome = false;
  expenseBtn.classList.add("active");
  incomeBtn.classList.remove("active");
});

// NOTIFICATION
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 2000);
}

// ADD TRANSACTION
addBtn.addEventListener("click", () => {
  const desc = text.value.trim();
  const amt = Number(amount.value);

  if (!desc || isNaN(amt) || amt <= 0) {
    showNotification();
    return;
  }

  const value = isIncome ? amt : -amt;
  transactions.push(value);

  updateUI();
  addHistory(desc, value);

  text.value = "";
  amount.value = "";
});

// UPDATE TOTALS
function updateUI() {
  const income = transactions.filter(v => v > 0).reduce((a,b)=>a+b,0);
  const expense = transactions.filter(v => v < 0).reduce((a,b)=>a+b,0) * -1;

  balance.innerText = formatINR(income - expense);
  moneyPlus.innerText = formatINR(income);
  moneyMinus.innerText = formatINR(expense);
}

// HISTORY
function addHistory(desc, val) {
  const li = document.createElement("li");
  li.innerText = `${desc} : ${formatINR(Math.abs(val))}`;
  list.appendChild(li);
}
