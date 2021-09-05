const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+'-'+file.originalname)
    }
})

const validationFile = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true);
    }else{
        cb({message: "ảnh không đúng định dạng"}, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024*1024},
    fileFilter: validationFile
})

module.exports = upload