const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllBooks = async(req, res) => {
    try {
        let { page, limit } = req.query;

        page = parseInt(page) || 1; // Default page = 1
        limit = parseInt(limit) || 5; // Default limit = 5

        const skip = (page - 1) * limit; // Hitung offset

        const buku = await prisma.buku.findMany({
            skip: skip,
            take: limit,
        });

        // Hitung total buku untuk pagination
        const totalBuku = await prisma.buku.count();

        res.status(200).json({
            statusCode: 200,
            data: buku,
            totalData: totalBuku,
            totalPages: Math.ceil(totalBuku / limit),
            currentPage: page,
        });
    } catch(error) {
        console.error("Error : ", error);
        res.status(404).json({
            statusCode: 404,
            message: "Error! Could not retrieve the data!"
        });
    }
}

exports.detailBooks = async(req, res) => {
    try {
        const parsedIdBuku = parseInt(req.params.id_buku);
        const buku = await prisma.buku.findUnique({
            where: {id_buku: parsedIdBuku}
        });

        res.status(200).json({
            statusCode: 200,
            data: buku
        })
    } catch(error) {
        console.error("Error : ", error);
        res.status(404).json({
            statusCode: 404,
            message: "Error! Could find the data with that ID!"
        });
    }
}
