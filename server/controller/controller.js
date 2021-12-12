const UploadModel = require('../model/schema');
const fs= require('fs');
const { promise } = require('bcrypt/promises');

exports.Home= async (req,res)=>{
    const all_images = await UploadModel.find();
    res.render('main',{images:all_images});
}

exports.uploads=(req,res,next)=>{
    const files=req.files;
    console.log(files);
    if(files.length==0){
        console.log("kaam nahi kar raha");
        const error=new Error('please choose files');
        error.httpStatusCode=400;
        return next(error);
    }
    //convert images to base 64
    let imgArry = files.map((file)=>{
        let img = fs.readFileSync(file.path);
        return encode_image = img.toString('base64');
    });

    let result=imgArry.map((src,index)=>{
        //create object to store data in collection
        let finalImg={
            filename:files[index].originalname,
            contentType:files[index].mimetype,
            imageBase64:src
        };
        let newUpload = new UploadModel(finalImg);

        return newUpload
          .save()
          .then(()=>{
              return {msg : `${files[index].originalname}image uploaded sucessfully`}
          })
          .catch(error=>{
              if(error){
                  if(error.name==="MongoError" && error.code===11000){
                      return Promise.reject({error:`Duplicate ${files[index].originalname} file already exists`});
                  }
                  return Promise.reject({error:error.message||`cannot upload ${files[index].originalname} something missing`});
              }
          })
    });
    Promise.all(result)
      .then(msg=>{
          //res.json(msg);
          res.redirect('/')
      })
      .catch(err=>{
          res.json(err);
      })

}