import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        const uniqueFilename = `${Date.now()}${file.originalname}`;
        req.fileName = uniqueFilename; // Save the filename in the request object for later use
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood)
foodRouter.post("/remove",removeFood)

export default foodRouter;
