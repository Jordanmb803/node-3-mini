const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const mc = require(`./controllers/messages_controller`);
const createInitialSession = require('./middlewares/session');
const filterBadWords = require('./middlewares/filter');

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));
app.use(expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized:true,
    cookie:{
        secure:false,
        maxAge:1000*10
    }

}))
app.use(createInitialSession);


app.post("/api/messages", filterBadWords, mc.create);
app.get("/api/messages", mc.read);
app.put("/api/messages", filterBadWords, mc.update);
app.delete("/api/messages", mc.delete);

const port = process.env.PORT || 3565
app.listen(port, () => { console.log(`Server listening on port ${port}.`); });