const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path') ;
const exphbs= require('express-handlebars');
// Inicializaciones
const app = express();
require('./database');
// SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb)=>{
        // El path.extname nos consigue la extensión
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
// Se pone el nombre del input, en este caso es image
// Le pasamos el {storage} que configuramos en multer.diskStorage
app.use(multer({storage}).single('image'));

// ROUTES
// node por defecto busca el index.js, no es necesario /index
app.use(require('./routes/index.routes'));


module.exports = app;