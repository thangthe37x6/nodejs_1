import express from 'express';
import rootRouter from './routes/root.mjs';
import bodyParser from 'body-parser';

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware để xử lý dữ liệu POST JSON
app.use(bodyParser.json());
app.use('/', rootRouter);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
