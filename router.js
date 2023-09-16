const express = require('express')
const mysql = require("mysql2");
const multer = require('multer');
const path = require('path');
const router = express.Router()

//* connect to mysql
const pool = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '20030608',
    database: "test"
})
pool.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

//* setup download destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname); // Unique filename for each uploaded image
    },
});

//* resolve requset
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log(req.method, req.url)
    next()
})

//* signup
router.post('/signup', (req, res) => {
    console.log(req.body)
    const sql = "INSERT INTO login (`firstname`,`lastname`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.password
    ]
    pool.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("error");
        }
        return res.json("register success!")
    })
})

//* login
router.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email`=(?) AND `password`=(?)";
    console.log(req.body)
    pool.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success");
        }
        else {
            return res.json("Faile");
        }
    })
})

//* upload image to SQL

const upload = multer({ storage: storage })
router.post('/upload', upload.array('images', 10), (req, res) => {

    //! 前置處理
    const filename = req.files[0].filename;
    const imgpath = path.join(__dirname, 'uploads', filename)
    console.log(imgpath)
    console.log(filename)

    //! insert image(buffer)
    const query = 'INSERT INTO photo (file_name, image_data) VALUES (?, LOAD_FILE(?))';
    pool.query(query, [filename, imgpath], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Image uploaded successfully!', id: results.insertId });

        //!　test => search image(buffer=>binary)
        pool.query('select * from photo where file_name=?', [filename], (err, data) => {
            if (err) {
                console.log(err)
            }
            console.log(data)
        })
    });
});

//* download image from SQL
router.get('/download/:filename', (req, res) => {
    console.log('1')
    console.log(req.params.filename)
    const filename = req.params.filename
    const path2file = path.join('model', filename)
    console.log(path2file, filename)
    res.download(path2file, filename, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log('send work')
        }
    })
})

module.exports = { router }