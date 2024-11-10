import fucalty from '../model/fucalty.model.js'
class Controllers {
    // Phương thức hiển thị trang index
    static async index(req, res) {
        const page = parseInt(req.query.page) || 1; // Current page
        const pageSize = parseInt(req.query.pageSize) || 10; // Items per page
        let q = req.query.q;
        const re = new RegExp(q, 'i'); // Regular expression for case-insensitive search
        const totalCount = await fucalty.countDocuments(); // Fixed spelling: 'fucalty' to 'faculty'
        let faculties; // Fixed spelling: 'fucaltys' to 'faculties'
        const totalPages = Math.ceil(totalCount / pageSize); // Fixed spelling: 'totalpage' to 'totalPage'
    
        if (q) {
            // Query to search by name using regular expression
            faculties = await fucalty.find({ name: re })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
        } else {
            faculties = await fucalty.find({})
                .skip((page - 1) * pageSize) // Ensure pagination works even without search
                .limit(pageSize);
        }
    
        res.render("index", { faculties, pageSize, page, totalCount, totalPages }); // Fixed spelling: 'fucaltys' to 'faculties'
    }
    

    // Phương thức hiển thị trang edit
    static async editget(req, res) {
        try {
            const id  = req.params.id
            const user = await fucalty.findById(id)
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
            const { name, numberof } = req.body; // Lấy thông tin từ form
    
            await fucalty.findByIdAndUpdate(id, { name, numberof }); // Cập nhật tài liệu
            res.redirect('/'); // Quay lại trang danh sách
        } catch (error) {
            console.error('Lỗi khi cập nhật tài liệu:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async addpost(req, res) {
        try {
            const  name = req.body.name;
            const  numberof = req.body.numberof;
            
            // Kiểm tra các giá trị trong req.body
            if (!name || !numberof) {
                return res.status(400).send('Name and Number of are required');
            }
    
            const dt = new fucalty({ name, numberof });
            await dt.save();
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
            await fucalty.findByIdAndDelete(id); // Xóa tài liệu theo id
            res.redirect('/'); // Quay lại trang danh sách
        } catch (error) {
            console.error('Lỗi khi xóa bản ghi:', error);
            res.status(500).send('Internal Server Error');
        }
    }

}

export default Controllers;
