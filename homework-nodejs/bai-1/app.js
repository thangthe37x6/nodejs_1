import express from "express";
const app = express();
import rootRouter from "./routes/root.mjs";
import bodyParser from "body-parser";
 
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', rootRouter);

app.listen(3000, () => {
    console.log("server is running on http://localhost:3000")
})