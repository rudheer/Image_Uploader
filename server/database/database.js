const mongoose = require('mongoose');
const config= require('../../config');

const Connect = async()=>{
    try{
        //mongodb cloud connection
        const con = await mongoose.connect(config.MONGO_URI,{
            useNewUrlParser:true,
        });
        console.log("connected to mongodb");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports=Connect