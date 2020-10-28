const app = require('express')();
require("dotenv").config();
const User = require('./models/User');
const Episode = require('./models/Episode');
const bcrypt = require('bcrypt');

const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const corsOptions = {
    exposedHeaders: 'Authorization',
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/', require("./routes"));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to database');

    User.exists({ username: 'admin' }).then(async exists => {
        if (!exists) {
            bcrypt.hash('admin', 10).then((hashedPassword) => {
                User.create({
                    username: 'admin',
                    password: hashedPassword,
                    role: 'ADMIN',
                    name: 'Administrador'
                }).catch(err => {
                    console.log(err);
                })
            })
            console.log('Usuario admin cadastrado')
        }

        const episodes = require('../episodes.json');
        const hasEpisodes = await Episode.countDocuments();
        if (!hasEpisodes) {
            Episode.insertMany(episodes).then(res => {
                Episode.find({ active: true }).then(res => {
                    console.log(res);
                });
            });
        }

    });


})
mongoose.set('useFindAndModify', false);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`app is running on http://localhost:${port}`));
