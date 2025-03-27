const express = require("express");
const router = express();
const upload = require("../config/upload");
const {getAllBuku, getAllBukuById, addNewBuku, updateBuku, deleteBuku} = require("../controller/BukuController");
const {login, logout} = require("../controller/LoginController");
const { authMiddleware } = require("../middleware/auth");
const {register} = require("../controller/RegisterController");

// route api login dan logout
router.post("/api/login", login);

router.get("/api/logout", logout);

// route api register
router.post("/api/register", register);

router.get("/api/admin/databuku", authMiddleware, getAllBuku);

router.get("/api/admin/databuku/:id_buku", authMiddleware, getAllBukuById);

router.post("/api/admin/tambahdatabuku", authMiddleware, upload.single("gambar"), addNewBuku);

router.put("/api/admin/ubahdatabuku/:id_buku", authMiddleware, upload.single("gambar"), updateBuku);

router.delete("/api/admin/hapusdatabuku/:id_buku", authMiddleware, deleteBuku);


module.exports = router;
