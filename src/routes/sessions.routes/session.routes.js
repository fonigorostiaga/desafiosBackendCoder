const express=require('express')
const md5 = require('md5')
const router=express.Router()
const userModel=require('../../../database/mongoDB/models/userModel')

router.get('/',(req,res)=>{
    if(req.session.username){
        return res.redirect('/inicio')
    }
    res.render('signup')
})
router.post('/signup',async(req,res)=>{
    const {email, password, username}=req.body
    const userFound=await userModel.findOne({email,username})
    if(userFound){
        req.session.errorMess="Se encontro un usuario con las credenciales ingresadas"
        return res.redirect('/error')
    }
    const userData={email, username, password:md5(password)}
    const newUser=new userModel(userData)
    await newUser.save() 
    req.session.username=username
    req.session.email=email
    

    
    res.redirect('/inicio')
})
router.get('/error',(req,res)=>{
    if(req.session.username){
        return res.redirect('/inicio')
    }

    res.render('error',{message:req.session.errorMess})
})
router.get('/login',async(req,res)=>{
    if(req.session.username){
        return res.redirect('/inicio')
    }

    res.render('login')

})
router.post('/login',async(req,res)=>{

    const {username,password}=req.body
    const userFound=await userModel.findOne({username, password:md5(password)})
    console.log(userFound)
    
    if(!userFound){
        req.session.errorMess='Las credenciales ingresadas son incorrectas'
        return res.redirect('/error')
    }
    req.session.username=userFound.username
    req.session.email=userFound.email
    res.redirect('/inicio')
})
router.get('/inicio',async(req,res)=>{
    if(!req.session.username){
        return res.redirect('/login')
    }
    res.render('inicio',{name:req.session.username})
    
})
router.get('/logout', async(req,res)=>{
    res.render('logout',{name:req.session.username})
    req.session.destroy(err=>{
        if(err){
            return res.status(400).json({
                success:false,
                message:err.message
            })
        }
    });
    
})

module.exports=router