import express from "express";
import fs from 'fs/promises';

const rootRouter = express.Router();
const filepath = "./number-vehicle.json";

// Hàm đọc dữ liệu từ file JSON
async function readfilejson() {
    try {
        const data = await fs.readFile(filepath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }
}

// Xử lý GET request để render trang với danh sách thành phố
rootRouter.get('/', async (req, res) => {
    try {
        const cities = await readfilejson();
        res.render('index', { cities });
    } catch (error) {
        res.status(500).send('Error loading city data');
    }
});

// Xử lý POST request để trả về biển số dưới dạng JSON
rootRouter.post('/', async (req, res) => {
    const { selectedCity } = req.body;

    try {
        const cities = await readfilejson();
        const cityInfo = cities.find(city => city.city === selectedCity);

        if (cityInfo) {
            res.json({ selectedCity: cityInfo.city, selectedPlateNo: cityInfo.plate_no });
        } else {
            res.json({ selectedCity: null, selectedPlateNo: null });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error processing request' });
    }
});

export default rootRouter;
