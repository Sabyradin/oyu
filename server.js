require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const { authorizeRoles } = require('./middleware/authMiddleware');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB-ға қосылу
mongoose.connect('mongodb+srv://sabraddinbais:dCFso6WV1YZZ6ox9@oyucluster.h0vlaxe.mongodb.net/?retryWrites=true&w=majority&appName=OYUCluster');

// Статикалық файлдар
app.use(express.static(path.join(__dirname, 'public')));

// Басты бет
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Тіркелу
app.post('/api/users/register', async (req, res) => {
    console.log("GET REGISTER request");
    try {
        const { fullName, email, phone, password } = req.body; // role әдепкі мәнмен қосылады

        console.log("Processing registration:", { fullName, email, phone }); // Дебаг үшін
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Бұл email қолданылған' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            fullName,
            email,
            phone,
            password: hashedPassword,
            role: 'user' // Әдепкі рөл
        });
        await user.save();

        res.status(201).json({ message: 'Тіркелу сәтті өтті', user: { fullName, email, phone } });
    } catch (error) {
        console.error("Registration error:", error); // Толық қате шығару
        res.status(500).json({ message: 'Сервер қатесі', error: error.message });
    }
});

// Кіру
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Пайдаланушы табылмады' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Қате құпия сөз' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role }, // ✅ role токенге қосылды
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Сервер қатесі' });
    }
});

// 🔥 Рөлмен қорғалған бет үлгісі
app.get('/api/admin/dashboard', authorizeRoles('admin'), (req, res) => {
    res.json({ message: 'Тек админ көре алатын дерек' });
});

// Сервер іске қосу
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер ${PORT} портында іске қосылды`);
});
