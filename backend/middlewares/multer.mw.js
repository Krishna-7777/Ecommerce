const multer = require("multer")

function fileFilter(req,file,cb){
    let type=file.mimetype.split('/')[0]
    if(type=="image"){
        cb(null,true)
    }else{
        cb(new Error(`${type} is not accepted.`))
    }
}

const storage = multer.diskStorage({
    destination:function(ask,file,cb){
        cb(null,"./routes/image")
    },
    filename:function(ask,file,cb){
        cb(null,file.fieldname+`_${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
})

const upload = multer({fileFilter,preservePath:true,storage,limits: { fileSize: 1 * 1024 * 1024 }})

module.exports={
    upload
}