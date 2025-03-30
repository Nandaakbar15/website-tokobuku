const express = require("express");
const router = express();
const upload = require("../config/upload");
const {getAllBuku, getAllBukuById, addNewBuku, updateBuku, deleteBuku} = require("../controller/BukuController");
const {getAllUsers, deleteUser} = require("../controller/DataUserController");
const {login, logout} = require("../controller/LoginController");
const { authMiddleware } = require("../middleware/auth");
const {register} = require("../controller/RegisterController");

// route api login dan logout
router.post("/api/login", login);

router.get("/api/logout", logout);

// route api register
router.post("/api/register", register);

router.get("/api/admin/databuku", authMiddleware, getAllBuku);

router.get("/api/admin/databuku/:id_buku", getAllBukuById);

router.post("/api/admin/tambahdatabuku", upload.single("gambar"), addNewBuku);

router.put("/api/admin/ubahdatabuku/:id_buku", upload.single("gambar"), updateBuku);

router.delete("/api/admin/hapusdatabuku/:id_buku", deleteBuku);

// route api data user
router.get("/api/admin/datauser", authMiddleware, getAllUsers);

router.delete("/api/admin/hapusUser/:id", deleteUser);



module.exports = router;
