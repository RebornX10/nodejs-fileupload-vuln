const express = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname
        cb(null, originalname);
    }
})

const maxSize = 25 * 25000 * 25000 
const upload = multer({ 
    storage: storage,
    limits: {fileSize: maxSize},
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// mypic is the name of file attribute 
}); // or simply { dest: 'uploads/' }


app.use(express.static('public'))
app.use(express.static('.'))
app.post('/upload', upload.array('avatar'), (req, res) => {
    return res.json({ status: 'OK', uploaded: req.files.length });
});



// set the "uploads" route
app.use('/uploads', express.static('uploads'));
app.use(express.static('/'))
    
app.listen(3001, function(error) {
    if(error) throw error
        console.log("Server created on port 3001")
        console.log("http://localhost:3001/")
});