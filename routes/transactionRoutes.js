const express = require("express")
const { addTransaction, getAllTransactions, editTransaction, deleteTransaction} = require("../controllers/transactionCtrl")

const router = express.Router()

//routes
// add transaction POST Method
router.post('/add-transaction', addTransaction)

// edit transaction PUT method
router.put('/edit-transaction', editTransaction)

// delete transaction DELETE method
router.delete('/delete-transaction/:id', deleteTransaction)

//get transactions
router.get("/get-transactions", getAllTransactions)

module.exports = router