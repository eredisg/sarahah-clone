import express from 'express';
import exphbs from 'express-handlebars';

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(3000, () => console.log("Running on port 3000"));