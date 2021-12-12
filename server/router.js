const express=require('express');
const route=express.Router();
const controller=require('../server/controller/controller');
const store= require('../server/middleware/multer')

//routes
route.get('/',controller.Home);
route.post('/uploadmultiple',store.array('images'),controller.uploads);

module.exports=route;