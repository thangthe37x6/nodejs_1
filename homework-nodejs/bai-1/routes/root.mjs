import express, { Router } from "express";
const rootRouter = express.Router()
import fs from 'fs';


const filepath = './user.txt';
let credentials = [];

// Hàm để đọc file và lưu dữ liệu vào danh sách
function loadCredentials() {
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.error('Lỗi khi đọc file:', err);
            return;
        }
        // Chia file thành các dòng và lưu vào danh sách
        credentials = data.split('\n').map(line => {
            const [username, password] = line.split(','); // Sửa dấu phân tách thành ','
            return { username: username.trim(), password: password.trim() }; // Trim để xóa khoảng trắng
        });
    });
}

// Gọi hàm để tải thông tin tài khoản
loadCredentials();

// Route xử lý đăng nhập
rootRouter.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = credentials.find(cred => cred.username === username && cred.password === password);

    if (user) {
        // Render thông tin người dùng
        res.render('information', { username: user.username, password: user.password });
    } else {
        res.send('Login failed! Invalid username or password.');
    }
});

// Route chính
rootRouter.get('/', (req, res) => {
    res.render("index", { title: "Cao Thế Thắng" });
});

export default rootRouter;