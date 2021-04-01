const Product = require("../models/product");
const formidable = require("formidable");
const _= require("lodash");
const fs = require("fs");
const product = require("../models/product");

expoerts.getProductById =(req,res,next,id) =>{
    Product.findById(id)
    .populate("category")
    .exec((err,product) =>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            })
        }
        req.product =product;
        next()
    })
}

exports.createProduct =(req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtentions = true;
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }

        //handle the files here
        let product = new product(fields)
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File size too big!"
                })
            }
            product.photo.data = fs.readSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        //save to the DB
        product.save((error,product)=>{
            if(err){
                res.status(400).js({
                    error:"Saving tshirt in DB failed"
                })
            }
            res.json(product)
        })
    })
}