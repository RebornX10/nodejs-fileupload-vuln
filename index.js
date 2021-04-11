const express = require("express")
const path = require("path")
const multer = require("multer")
const app = express()
    
// View Engine Setup
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")

// set the "uploads" route
const uploadRoute = 'uploads/' + filename
route.get('/uploads/:filename',(req,res) => {
    res.sendFile(__dirname,"../uploads/"+req.param('filename'));
    });
//app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(uploadRoute));
    
// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it
    
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        const { originalName } = file
      cb(null, originalName)
    }
  })
       
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 25 * 25000 * 25000;
    
var upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
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
}).single("picture");       
  
app.get("/",function(req,res){
    res.render("Signup");
})
    
app.post("/uploadProfilePicture",function (req, res, next) {
        
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    upload(req,res,function(err) {
  
        if(err) {
  
            // ERROR occured (here it can be occured due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            res.send(err)
        }
        else {
  
            // SUCCESS, image successfully uploaded
            res.send("Success, Image uploaded!")
        }
    })
})
    
// Take any port number of your choice which
// is not taken by any other process
app.listen(8080,function(error) {
    if(error) throw error
        console.log("Server created Successfully on PORT 8080")
})