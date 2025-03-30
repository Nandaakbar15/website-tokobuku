const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllUsers = async(req, res) => {
    try {
        const user = await prisma.user.findMany();

        res.status(200).json({
            statusCode: 200,
            data: user
        });
    } catch(error) {
        console.error("Error : ", error);
        res.status(404).json({
            statusCode: 404,
            message: "Error! Could not retrieve user data!"
        });
    }
}

exports.deleteUser = async(req, res) => {
    try {
        const parsedIdUser = parseInt(req.params.id);
        await prisma.user.delete({
            where: {id: parsedIdUser}
        });

        res.status(201).json({
            statusCode: 201,
            message: "User successfully deleted!"
        });
    } catch(error) {
        console.error("Error : ", error);
        res.status(404).json({
            statusCode: 404,
            message: "Error! Could not delete user!"
        });
    }
}