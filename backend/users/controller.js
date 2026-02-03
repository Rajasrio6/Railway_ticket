import jwt from 'jsonwebtoken';
import { users } from '../database/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key';

export const login = (req, res) => {
    try {
        const { email, password } = req.body;

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({
                message: "Login successful",
                token,
                user: { id: user.id, email: user.email, name: user.name }
            });
        }

        res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
        res.status(500).json({ message: "Error during login", error: error.message });
    }
};

export const register = (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = {
            id: users.length + 1,
            email,
            name,
            password
        };

        users.push(newUser);

        const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: newUser.id, email: newUser.email, name: newUser.name }
        });
    } catch (error) {
        res.status(500).json({ message: "Error during registration", error: error.message });
    }
};