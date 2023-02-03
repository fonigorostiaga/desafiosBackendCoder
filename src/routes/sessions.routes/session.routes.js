const express=require('express')
const md5 = require('md5')
const router=express.Router()
const userModel=require('../../../database/mongoDB/models/userModel')
const passport=require('passport')


router.get('/',(req,res)=>{
    if(req.session.username){
        return res.redirect('/inicio')
    }
    res.render('signup')
})

router.post('/signup',passport.authenticate('signup', {failureRedirect:'/error'}),async(req,res)=>{
    req.session.username=req.user.username
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

router.post('/login',passport.authenticate('login',{failureRedirect:'/error'}),async(req,res)=>{
    req.session.username=req.user.username
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