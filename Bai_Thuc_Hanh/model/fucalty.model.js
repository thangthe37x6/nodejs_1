import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    id: { 
      type: Number, 
      unique: true 
    }, // id tự tăng sẽ được xử lý riêng bên dưới.
    customerName: { 
      type: String, 
      required: true 
    }, // Tên khách hàng
    date: { 
      type: Date, 
      required: true 
    }, // Ngày đặt
    time: { 
      type: String, // Lưu dạng HH:mm (TIME trong MongoDB không có kiểu riêng).
      required: true 
    }, // Giờ đặt
    status: { 
      type: String, 
      required: true
      
    } // Trạng thái, mặc định là "Pending".
  });
  
  bookingSchema.pre("save", async function (next) {
    if (!this.isNew) return next();
  
    const lastBooking = await Booking.findOne().sort({ id: -1 });
    this.id = lastBooking ? lastBooking.id + 1 : 1; // Nếu không có booking nào, đặt id = 1
    next();
  });
  
  // Tạo Model
  const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;



