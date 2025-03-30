const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllBuku = async (req, res) => {
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
    } catch (error) {
        console.error("Error: ", error);
        res.status(404).json({
            statusCode: 404,
            message: "Error! Could not retrieve the data!",
        });
    }
};


exports.getAllBukuById = async(req, res) => {
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

exports.addNewBuku = async(req, res) => {
    try {
        const {judul_buku, penulis, penerbit, stok, harga} = req.body;
        const gambar = req.file ? req.file.filename : null;
        const parsedStok = parseInt(stok);
        const parsedHarga = parseInt(harga);

        await prisma.buku.create({
            data: {
                judul_buku,
                penulis,
                penerbit,
                stok: parsedStok,
                harga: parsedHarga,
                gambar
            }
        });

        res.status(200).json({
            statusCode: 200,
            message: "New Data added successfully!"
        });
    } catch(error) {
        console.error("Error : ", error);
        res.status(404).json({
            statusCode: 404,
            message: "Error! Could not add the data!"
        });
    }
}

exports.updateBuku = async(req, res) => {
    try {
        const parsedIdBuku = parseInt(req.params.id_buku);
        const {judul_buku, penulis, penerbit, stok, harga} = req.body;
        const gambar = req.file ? req.file.filename : null;
        const parsed_stock = parseInt(stok);
        const parsed_harga = parseInt(harga);

        const updateData = {
            judul_buku,
            penulis,
            penerbit,
            stok: parsed_stock,
            harga: parsed_harga,
            gambar
        }

        await prisma.buku.update({
            where: {id_buku: parsedIdBuku},
            data: updateData
        });

        res.status(200).json({
            statusCode: 200,
            message: "Data updated successfully!"
        });
    } catch(error) {
        console.error("Error : ", error);
        res.status(404).json({
            statusCode: 404,
            message: "Error! Could not update the data!"
        });
    }
}

exports.deleteBuku = async(req, res) => {
    try {
        const parsed_idBuku = parseInt(req.params.id_buku);
        await prisma.buku.delete({where: {id_buku: parsed_idBuku}});

        res.status(200).json({
            statusCode: 200,
            message: "Data deleted successfully!"
        });
    } catch(error) {
        console.error("Error : ", error);
        res.status(404).json({
            statusCode: 404,
            message: "Error! Could not delete the data!"
        });
    }
}