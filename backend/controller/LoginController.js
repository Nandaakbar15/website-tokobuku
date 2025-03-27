const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key"; // Ganti dengan kunci rahasia yang lebih aman

exports.login = async(req, res) => {
    try {
        const {email, password} = req.body;

        // mengecek apakah user sudah ada di database
        const user = await prisma.user.findUnique({
            where: {email: email}
        });

        if (!user) {
            return res.status(401).json({
                statusCode: 401,
                message: "Invalid email or password!"
            });
        }

        // Bandingkan password dengan yang ada di database
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                statusCode: 401,
                message: "Invalid email or password!"
            });
        }

        // Buat token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role }, 
            SECRET_KEY, 
            { expiresIn: "1h" }
        );

        res.status(200).json({
            statusCode: 200,
            message: "Login successful!",
            token
        });

    } catch(error) {
        console.error("Error : ", error);
        res.status(404).json({
            statusCode: 404,
            message: "Error! Could not login!"
        });
    }
}

exports.logout = (req, res) => {
    try {
        res.status(200).json({
            statusCode: 200,
            message: "Logout successfully!"
        })
    } catch(error) {
        console.log("Error : ", error);
        res.status(404).json({
            statusCode: 404,
            message: "Could not logout!"
        });
    }
}