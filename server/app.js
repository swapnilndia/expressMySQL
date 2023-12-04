const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./router/user');

const sequelize = require('./util/database');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/user',userRoutes);

sequelize
.sync()
// .sync({force: true})
.then(()=>{
    app.listen(3000, ()=>{
        console.log('app running on port 3000');
        console.log('tabels created');
    });
})
.catch((err)=> console.log(err))

