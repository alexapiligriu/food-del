import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://aleksandrapiligriu:00672199541a@cluster0.evoyp.mongodb.net/food-delivery').then(()=>console.log("DB Connected"));
}
