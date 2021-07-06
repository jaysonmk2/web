const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3333


const cookieParser = require('cookie-parser')
const session = require('express-session')



//middleware
const db = require('./models');
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
        key: "userid",
        secret: "lab1234",  //use something secure here
        resave: false,
        saveUninitialized:false,
        cookie:{
            expires: 60*60* 24,
        }
    }
))

const users = require('./routes/Users');
app.use("/auth",users);


const subjects = require('./routes/Subjects');
app.use("/subjects",subjects);


const rooms = require('./routes/Rooms')
app.use('/rooms',rooms)

const bulletboard = require('./routes/BulletBoard');
app.use('/bulletboard',bulletboard)

db.sequelize.sync().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server running on port ${port}`)
        });
})


