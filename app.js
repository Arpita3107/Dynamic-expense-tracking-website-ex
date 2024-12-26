document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    updateExpenseList();

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value);

        if (name && amount) {
            const expense = {
                id: Date.now(),
                name,
                amount
            };

            expenses.push(expense);
            localStorage.setItem("expenses", JSON.stringify(expenses));

            expenseNameInput.value = "";
            expenseAmountInput.value = "";

            updateExpenseList();
        }
    });

    function updateExpenseList() {
        expenseList.innerHTML = "";
        let total = 0;

        expenses.forEach(expense => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${expense.name} - $${expense.amount.toFixed(2)}
                <span onclick="deleteExpense(${expense.id})">x</span>
            `;
            expenseList.appendChild(listItem);
            total += expense.amount;
        });

        totalAmount.textContent = total.toFixed(2);
    }

    window.deleteExpense = function (id) {
        expenses = expenses.filter(expense => expense.id !== id);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateExpenseList();
    };
});

