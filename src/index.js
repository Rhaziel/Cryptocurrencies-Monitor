const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT;
const mongoose = require('mongoose');
import userRoutes from './modules/users/routes/userRoutes'

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
*/

app.use('/',userRoutes)

app.get('/', (req,res) => {
    res.send('Hello World')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});