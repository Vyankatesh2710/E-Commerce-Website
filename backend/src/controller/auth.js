//$7mEntoR$$%  PassWord WIFI

const User = require("../models/auth");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken")
// exports.signup = (req, resp) => {
//   User.findOne({ email: req.body.email }).then(async (error, user) => {
//     if (user) {
//       return resp.status(400).json({
//         message: "User Already Registered",
//       });

//       const { firstName, lastName, email, password } = req.body;
//       const hash_password = await bcrypt.hash(password, 10);
//       const _user = new User({
//         firstName,
//         lastName,
//         email,
//         hash_password,
//         userName: Math.random().toString(),
//       });
//       _user.save().then((error, data) => {
//         if (error) {
//           return resp.status(400).json({
//             message: "Something Went Wrong",
//           });
//         }
//         if (data) {
//           return resp.status(201).json({
//             message: "User Created Successfully",
//           });
//         }
//       });
//     }
//   });
// };

exports.signup=(req,resp)=>{
  User.findOne({email:req.body.email}).then(async(error,user)=>{
    if(user)
      return resp.status(400).json({
          message:"User Already Registered"
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
    _user.save().then((error,user)=>{
      if(error){
        return resp.status(400).json({
          message:"Something Went Wrong"
        })
      }
      if(user){
        const token=generateJwtToken(user._id,user.role)
        const {_id,firstName,lastName,email,role,fullName}=user
        return resp.status(201).json({
          token,
          user:{_id,firstName,lastName,email,role,fullName}
        })
      }
    })
  })
}

exports.signin=(req,resp)=>{
  User.findOne({email:req.body.email}).then(async (error,user)=>{
    if(error){
      return resp.status(400).json({error})
    }
    if(user){
      const isPassword=await user.authenticate(req.body.password)
      if(isPassword && user.role==="user"){
        const token=generateJwtToken(user,_id,user.role)
        const {_id,firstName,lastName,email,role,fullName}=user
        resp.status(200).json({
          token,
          user:{_id,firstName,lastName,email,role,fullName}
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