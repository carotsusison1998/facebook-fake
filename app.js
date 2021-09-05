// Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const upload = require("./multer");
const cloudinary = require("./cloudinary");
const fs = require("fs");
const mongoose = require('mongoose');
const Accounts = require("./models/account");
const MessageAll = require("./models/message_all");

// setup connect mongodb by mongo
mongoose.connect('mongodb+srv://admin:admin123@cluster0.51c2x.mongodb.net/db_facebag', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true  
    })
    .then(()=>{
        console.log('connected sucessfully db db_facebag');
    }).catch((err)=>{
        console.log(`connecte db error ${err} `);
    })
    
mongoose.set('useFindAndModify', false);

const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(session({ secret: 'facebagsecret', cookie: { maxAge: 3600000 }}))

const login_routes = require("./routes/login");
const register_routes = require("./routes/register");
const user_routes = require("./routes/user");
const post_routes = require("./routes/post");
const index_routes = require("./routes/index");


io.on("connection", (socket) => {
    console.log(socket.id , " đã kết nối");
    socket.on("disconnect", () => {
        console.log(socket.id, " đã ngắt kết nối");
        io.sockets.emit("sv-disconnect", socket.id+" đã đăng xuất");
    })
    socket.on("cl-like-post", function(data){
        console.log(data);
        io.sockets.emit("sv-like-post", socket.id+" đã like post");
    });
    socket.on("cl-send-message", async function(data){
        io.sockets.emit("sv-send-message", data);
        // const message_all = new MessageAll(data);
        // await message_all.save();
    });

    socket.on("cl-send-keyup", async function(data){
        io.sockets.emit("sv-send-keyup", data);
    });

    socket.on("cl-logout", async function(data){
        const offlineAccount = await Accounts.findByIdAndUpdate(data, {"$set": {"active": false }});
        if(offlineAccount){
            io.sockets.emit("sv-message-logout", data);
        }
    });
});



app.use("/", index_routes);
app.use("/login", login_routes);
app.use("/edit-user", upload.array('avatar'), user_routes);
app.use("/insert-post", upload.array('imagepost'), post_routes);

app.use("/register", register_routes);
app.use("/logout", async function(req, res) {
    if(req.session.User){
        const offlineAccount = await Accounts.findByIdAndUpdate(req.session.User._id, {"$set": {"active": false }});
        if(offlineAccount){
            req.session.destroy(function(err) {
                return res.redirect('/login');
            });
        }
    }else{
        req.session.destroy(function(err) {
            return res.redirect('/login');
        });
    }
});
app.use("/api/get-message-all", async function(req, res){
    var ObjectId = require('mongodb').ObjectID;
    const person_send_id = req.body.person_send_id
    const person_recieve_id = req.body.person_recieve_id
    const list_message_all = await MessageAll.find( 
        {
            personSendId: ObjectId(person_send_id),
            personRecieveId: ObjectId(person_recieve_id),
        }
    );
    const list_message_all2 = await MessageAll.find( 
        {
            personSendId: ObjectId(person_recieve_id),
            personRecieveId: ObjectId(person_send_id),
        }
    );
    let data_message_all = list_message_all.concat(list_message_all2);
    data_message_all.sort(function compare(a, b) {
        var dateA = new Date(a.timeSendMessage);
        var dateB = new Date(b.timeSendMessage);
        return dateA - dateB;
    });
    if(list_message_all){
        return res.status(200).json({
            "status": "success",
            "sum": list_message_all.length + list_message_all2.length,
            "data": data_message_all,
        });
    }
})
// cacth
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error
app.use((err, req, res, next) => {
    const error = app.get("env") === "development" ? err : {};
    const status = err.status || 500;
    //res to client
    if(status === 500){
        return res.redirect('/login');
    }else{
        return res.status(status).json({
            error: {
                message: error.message,
            },
        });
    }
});

// start server
// const port = app.get("port") || 9999;
const port = process.env.PORT || 9999;
server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});