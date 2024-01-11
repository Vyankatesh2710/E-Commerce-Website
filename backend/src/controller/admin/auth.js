//$7mEntoR$$%  PassWord WIFI
const User = require("../../models/auth");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken")
exports.signup=(req,resp)=>{
  User.findOne({email:req.body.email}).then(async(error,admin)=>{
    if(admin)
      return resp.status(400).json({
          message:"Admin Already Registered"
    })

    const {firstName,lastName,email,password}=req.body
    const hash_password=await bcrypt.hash(password,10)
    const _user=new User({
      firstName,
      lastName,
      email,
      hash_password,
      userName:Math.random().toString()
    })
    _user.save().then((error,admin)=>{
      if(error){
        return resp.status(400).json({
          message:"Something Went Wrong"
        })
      }
      if(admin){
        const token=generateJwtToken(admin._id,admin.role)
        const {_id,firstName,lastName,email,role,fullName}=admin
        return resp.status(201).json({
          token,
          admin:{_id,firstName,lastName,email,role,fullName}
        })
      }
    })
  })
}

exports.signin=(req,resp)=>{
  User.findOne({email:req.body.email}).then(async (error,admin)=>{
    if(error){
      return resp.status(400).json({error})
    }
    if(admin){
      const isPassword=await admin.authenticate(req.body.password)
      if(isPassword && admin.role==="admin"){
        const token=generateJwtToken(admin,_id,admin.role)
        const {_id,firstName,lastName,email,role,fullName}=admin
        resp.status(200).json({
          token,
          admin:{_id,firstName,lastName,email,role,fullName}
        })
      }
      else{
        return resp.status(400).json({
          message:"Something Went Wrong"
        })
      }
    }
  })
}