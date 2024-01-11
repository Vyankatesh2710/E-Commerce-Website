const { Router } = require('express')
const category=require('../models/category')
const slugify = require('slugify')
exports.addCategory=(req,resp)=>{
    const categoryObj={
        name:req.body.name,
        type:req.body.type,
        slug:slugify(req.body.name)
    }
    if(req.body.name){
        categoryObj.parentId=req.body.parentId
    }
    const cat=new category(categoryObj)
    cat.save().then((error,category)=>{
        if(error){
            return resp.status(400).json({error})
        }

        if(category){
            return resp.status(201).json({category})
        }
    })
}

exports.getCategory=(req,resp)=>{
    category.find({}).then((error,category)=>{
        if(error)
        {
            return resp.status(400).json({error})
        }
        if(category)
        {
            return resp.status(201).json({category})
        }
    })
}