const moment = require('moment')
const transactionModel = require('../models/transactionModel')

const getAllTransactions = async (req, res) => {
    try {
      const { frequency, formattedDates, type } = req.query;
  
      const dates = formattedDates ? JSON.parse(formattedDates) : null;
  
      const transactions = await transactionModel.find({
        ...(frequency !== "custom"
          ? {
              date: {
                $gt: moment().subtract(Number(frequency), "d").toDate(),
              },
            }
          : {
              date: {
                $gte: dates[0],
                $lte: dates[1],
              },
            }),
        userid: req.query.userid,
        ...(type !== "all" && { type }),
      });
  
      res.status(200).json(transactions);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  

const addTransaction = async (req,res) => {
    try{
        const newTransaction = new transactionModel(req.body)
       await newTransaction.save()
       res.status(201).send({newTransaction})
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
}

const editTransaction = async (req,res) => {
    try {
        await transactionModel.findOneAndUpdate({_id: req.body.transactionId}, req.body.payload)
        res.status(200).send("Edit Successfully")
    } catch (error) {
        console.log(err)
        res.status(500).json(err);
    }
}

const deleteTransaction = async (req,res) => {
    const id = req.params.id
    try {
        await transactionModel.findByIdAndRemove(id);
        res.status(200).send("Transaction Deleted")
    } catch (error) {
        console.log(err)
        res.status(500).json(err);
    }
}

module.exports = {getAllTransactions, addTransaction,editTransaction, deleteTransaction}