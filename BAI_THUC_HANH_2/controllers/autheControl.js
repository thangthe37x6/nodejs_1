import jwtproviders from "../providers/jwtproviders.js";
import usersData from "../models/users.js";
import bcrypt from "bcrypt"
import ms from "ms"
class autheUser {
    static async register(req, res) {
        const { username, password } = req.body;
    
        try {
            // Kiểm tra xem username đã tồn tại chưa
            const existingUser = await usersData.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: "Registration failed. Username already exists." });
            }
    
            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10); // 10 là số vòng lặp (salt rounds)
    
            // Tạo người dùng mới
            const newUser = new usersData({ username, password: hashedPassword });
            await newUser.save();
    
            // Phản hồi thành công
            res.status(201).json({ message: "Register success", username });
        } catch (error) {
            console.error("Registration error:", error); // Log lỗi để debug
            res.status(500).json({ message: "An error occurred during registration. Please try again later." });
        }
    }
    static async login(req, res) {
        const { username, password } = req.body;
    
        try {
            // Tìm kiếm người dùng trong cơ sở dữ liệu
            const user = await usersData.findOne({ username });
    
            // Kiểm tra xem người dùng có tồn tại không
            if (!user) {
                return res.status(401).json({ message: "Login failed. User not found." });
            }
    
            // Kiểm tra mật khẩu
            const isPasswordValid = await bcrypt.compare(password, user.password); // Đảm bảo bạn mã hóa mật khẩu khi lưu vào DB
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Login failed. Invalid password." });
            }
    
            // Tạo token
            const userInfo = { username, id: user._id }; // Truyền thêm `id` để đảm bảo bảo mật
            const accessToken = await jwtproviders.createToken(userInfo, process.env.accect_token, "1h");
    
            // Thiết lập cookie an toàn
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Chỉ bật `secure` khi ở môi trường production
                sameSite: 'none',
                maxAge: ms('1h'),
            });
    
            // Gửi phản hồi thành công
            return res.status(200).json({ message: "Login success", accessToken });
        } catch (error) {
            console.error("Login error:", error); // Log lỗi để dễ debug
            return res.status(500).json({ message: "An error occurred. Please try again later." });
        }
    }
}

export default autheUser;