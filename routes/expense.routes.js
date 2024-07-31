const router = require("express").Router()
const expenseController = require("../controllers/expense.controllers")

router
    .get("/", expenseController.getAllExpenses)
    .post("/add-expense", expenseController.addExpense)
    .put("/update-expense/:id", expenseController.updateExpense)
    .delete("/delete-expense/:id", expenseController.deleteExpense)
    .get('/monthly-expenses', expenseController.calculateMonthlyExpenses)
    .get('/daily-expenses', expenseController.calculateMonthlyDailyExpenses)

module.exports = router
