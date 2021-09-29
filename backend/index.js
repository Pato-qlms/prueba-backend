if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

require('dotenv').config();

console.log(process.env.NODE_ENV);

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

//instalization
const app = express();
require('./database');

//seting 
app.set('port', 3000);

//middleware
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename(req ,file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer(storage).single('image'));
app.use(express.urlencoded({extended: false}))
app.use(express.json());

//routes
app.use('/api/books',require('./routes/books'));

//staticfiles
app.use(express.static(path.join(__dirname, 'public')));


//start the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})