import Booking from '../model/fucalty.model.js'
class Controllers {
    // Phương thức hiển thị trang index
    static async index(req, res) {
        const page = parseInt(req.query.page) || 1; // Current page
        const pageSize = parseInt(req.query.pageSize) || 10; // Items per page
        let q = req.query.q;
        const re = new RegExp(q, 'i'); // Regular expression for case-insensitive search
        const totalCount = await Booking.countDocuments(); // Fixed spelling: 'fucalty' to 'faculty'
        let faculties; // Fixed spelling: 'fucaltys' to 'faculties'
        const totalPages = Math.ceil(totalCount / pageSize); // Fixed spelling: 'totalpage' to 'totalPage'
    
        if (q) {
            // Query to search by name using regular expression
            faculties = await Booking.find({ name: re })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
        } else {
            faculties = await Booking.find({})
                .skip((page - 1) * pageSize) // Ensure pagination works even without search
                .limit(pageSize);
        }
    
        res.render("index", { faculties, pageSize, page, totalCount, totalPages }); // Fixed spelling: 'fucaltys' to 'faculties'
    }
    

    // Phương thức hiển thị trang edit
    static async editget(req, res) {
        try {
            const id  = req.params.id
            const user = await Booking.findById(id)
            if (!user) {
                return res.status(404).send('Faculty not found');
            }
            res.render('edit', {user});
        } catch (error) {
            // Xử lý lỗi khi render
            res.status(500).send('Internal Server Error');
        }
    }
    static async editpost(req, res) {
        try {
            const id = req.params.id; // Lấy ID từ URL
            const {customerName, date, time, status} = req.body // Lấy thông tin từ form
    
            await Booking.findByIdAndUpdate(id, { customerName, date, time, status}); // Cập nhật tài liệu
            res.redirect('/'); // Quay lại trang danh sách
        } catch (error) {
            console.error('Lỗi khi cập nhật tài liệu:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async addpost(req, res) {
        try {
            const { customerName, date, time, status } = req.body;
            console.log(req.body)
            // Kiểm tra các giá trị trong req.body
            if (!customerName || !date || !time || !status) {
                return res.status(400).send('You need to fill in all required fields.');
            }
    
            // Kiểm tra ngày không nằm trong quá khứ
            const bookingDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Đặt thời gian về 00:00 để so sánh chỉ tính ngày
    
            if (bookingDate < today) {
                return res.status(400).send('Booking date cannot be in the past.');
            }
    
            // Kiểm tra ngày không bị trùng với ngày đã được đặt
            const existingBooking = await Booking.findOne({ date: bookingDate });
            if (existingBooking) {
                return res.status(400).send('The selected date is already booked.');
            }
    
            // Nếu không có lỗi, lưu booking mới
            const newBooking = new Booking({ customerName, date, time, status });
            await newBooking.save();
    
            res.redirect('/');
        } catch (error) {
            // Xử lý lỗi khi render
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    
    
    static async addget(req, res) {
        try {
            res.render('add-f');
        } catch (error) {
            // Xử lý lỗi khi render
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    static async deletedata(req, res) {
        try {
            const id = req.params.id; // Lấy id từ URL
            await Booking.findByIdAndDelete(id); // Xóa tài liệu theo id
            res.redirect('/'); // Quay lại trang danh sách
        } catch (error) {
            console.error('Lỗi khi xóa bản ghi:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    static async cancell(req, res) {
        const id = req.params.id
        try {
           await Booking.findByIdAndUpdate(id, {status: "Cancelled"})
            res.redirect('/')
        } catch (error) {
            res.status(500).send("error booking")
        }
    }

}

export default Controllers;
