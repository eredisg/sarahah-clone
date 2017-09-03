import express from 'express';
import exphbs from 'express-handlebars';

const app = express();

app.engine('hbs', exphbs({extname: '.hbs', defaultLayout: '_layout'}));
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(3000, () => console.log("Running on port 3000"));