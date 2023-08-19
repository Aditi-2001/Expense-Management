const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')

//login controller
const loginController = async (req,res) => {
    try{
        const {email,password} = req.body
        const user  = await userModel.findOne({email})
        if(!user){
           return res.status(404).send('User Not Found')
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect Password" });
        }
        
        return res.status(200).json({
            success: true,
            user,
        })
    } catch (err){
        console.log("Came in this block")
        res.status(400).json({
            success:false,
            err,
        })
    }
}

//register Controller
const registerController = async (req,res) => {
    try{
        const hashedPassword = bcrypt.hashSync(req.body.password)
        const newUser = new userModel({...req.body, password:hashedPassword})
        await newUser.save()
        res.status(201).json({
            success:true,
            newUser,
        })

    }catch (err) {
        res.status(400).json({
            success:false,
            err,
        })
    }
}

module.exports = {loginController, registerController};