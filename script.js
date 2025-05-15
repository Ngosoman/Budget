let totalIncome = 0;
let totalExpenses = 0;
let expenses = [];

// Load saved data from localStorage
window.onload = function () {
  const savedIncome = localStorage.getItem('totalIncome');
  const savedExpenses = localStorage.getItem('totalExpenses');
  const savedExpenseList = JSON.parse(localStorage.getItem('expenses'));

  if (savedIncome) totalIncome = parseFloat(savedIncome);
  if (savedExpenses) totalExpenses = parseFloat(savedExpenses);
  if (savedExpenseList) expenses = savedExpenseList;

  updateUI();
};

function setBudget() {
  const income = document.getElementById('income').value;
  if (income && !isNaN(income)) {
    totalIncome = parseFloat(income);
    localStorage.setItem('totalIncome', totalIncome);
    updateUI();
  } else {
    alert("Please enter a valid income.");
  }
}

document.getElementById('entry-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  if (!description || isNaN(amount) || amount <= 0) {
    alert("Enter valid description and amount.");
    return;
  }

  if (type === 'income') {
    totalIncome += amount;
    localStorage.setItem('totalIncome', totalIncome);
  } else {
    totalExpenses += amount;
    expenses.push({ name: description, amount: amount });
    localStorage.setItem('totalExpenses', totalExpenses);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  // Clear inputs
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('type').value = 'income';

  updateUI();
});

function updateUI() {
  document.getElementById('total-income').innerText = totalIncome.toFixed(2);
  document.getElementById('total-expenses').innerText = totalExpenses.toFixed(2);
  document.getElementById('remaining-budget').innerText = (totalIncome - totalExpenses).toFixed(2);
  updateExpenseList();
}

function updateExpenseList() {
  const expenseList = document.getElementById('expense-list');
  expenseList.innerHTML = '';

  expenses.forEach(expense => {
    const li = document.createElement('li');
    li.innerText = `${expense.name}: $${expense.amount.toFixed(2)}`;
    expenseList.appendChild(li);
  });
}

// Optional: Set a cookie (e.g., user last visit)
document.cookie = `lastVisit=${new Date().toUTCString()}; path=/`;
