const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const router = require("./routes/route");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use(router);
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: "Toko Buku Website App"
    });
});