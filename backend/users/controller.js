import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key';

export const login = (req, res) => {
    try {
        const { email, password } = req.body;

        // Mock authentication
        if (email === 'demo@easyticket.com' && password === 'password123') {
            const token = jwt.sign({ id: 1, email }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({
                message: "Login successful",
                token,
                user: { id: 1, email, name: "Demo User" }
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
        // Mock registration - just return a success and a token
        const token = jwt.sign({ id: 2, email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: 2, email, name }
        });
    } catch (error) {
        res.status(500).json({ message: "Error during registration", error: error.message });
    }
};