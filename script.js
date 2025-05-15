let totalIncome = 0;
let totalExpenses = 0;
let totalRemainingBudget = 0;
let expenses = [];

function setBudget() {
    const income = document.getElementById('income').value;
    if (income && !isNaN(income)) {
        totalIncome = parseFloat(income);
        document.getElementById('total-income').innerText = totalIncome.toFixed(2);
        updateRemainingBudget();
    }
    else {
        alert("Please enter a valid income.");
    }
}

function addExpense() {
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = document.getElementById('expense-amount').value;

    if (expenseName && expenseAmount > 0 && !isNaN(expenseAmount)) {
        const amount = parseFloat(expenseAmount);
        totalExpenses += amount;
        expenses.push({ name: expenseName, amount: amount });

        document.getElementById('total-expenses').innerText = totalExpenses.toFixed(2);
        updateRemainingBudget();
        updateExpenseList();
    }
    else {
        alert("Please enter a valid expense name and amount.");
    }
}

function updateRemainingBudget() {
    const remainingBudget = totalIncome - totalExpenses;
    document.getElementById('remaining-budget').innerText = remainingBudget.toFixed(2);
}
function updateExpenseList() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerText = `${expense.name}: ${expense.amount.toFixed(2)}`;
        expenseList.appendChild(li);
    });
}