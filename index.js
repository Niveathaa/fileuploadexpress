
const express=require('express');

const app = express();
const path=require('path');
const multer=require('multer');

app.set('views',path.join(__dirname,"views"));
app.set('view engine',"ejs");
// npm i multer
//multer is a midlleware
// disk storage is the fn in multer-can give options
//1 st option - destination-info abt the folder where our entered info shd be stored
var storage=multer.diskStorage({
    destination: function(req,file,cb){  //cb is call back
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname.replace(/\.[^/.]+$/,"")+'_'+Date.now()+path.extname(file.originalname))
    }
})
let maxsize=10*1000*1000;//convert into bytes 10mb in bytes
let upload =  multer({
    storage:storage,
    limits:{
        filesize:maxsize //cal filesize in bytes
    },
    fileFilter:function(req,file,cb){
        let filetypes=/jpeg|jpg|png/;  //optional
        let mimetype=filetypes.test(file.mimetype)//mimetype tells the type of file/img or doc
         //file.mimetype if jpeg, we have jpeg format in filetypes so by using "test" it returns true(boolean value)

        let extname=filetypes.test(path.extname(file.originalname.toLowerCase()));
        //
        if(mimetype && extname){
            return cb(null,true);//cb(err?,accept?)
        }
        cb("Error:file upload only supports only the following filetypes only:"+filetypes);


       }
    }).single('mypic');//"mypic"is the fieldname in form
//.single is used so single file can be uploaded


app.get('/',(req,res)=>
{
    res.render('signup')
})
app.post('/upload',(req,res,next)=>{

    upload(req,res,function(err){

  
       if(err){
        
       
           res.send(err);
        }
    else{
        res.send("success.img uploaded");
    
    }
})

})
app.listen(8081,()=>{
    console.log("running");
}
)