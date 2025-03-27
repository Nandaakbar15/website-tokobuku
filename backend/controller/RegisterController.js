const {PrismaClient} = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

exports.register = async(req, res) => {
    try {
        const {username, email, password} = req.body;

        // Cek apakah email sudah digunakan
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            return res.status(400).json({
                statusCode: 400,
                message: "Email already exists!"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        res.status(200).json({
            statusCode: 200,
            message: "New User added successfully!"
        })
    } catch(error) {
        console.error("Error : ", error);
        res.status(404).json({
            statusCode: 404,
            message: "Error! Could not register!"
        });
    }
} 