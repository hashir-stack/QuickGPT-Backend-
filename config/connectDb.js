const mongoose = require("mongoose");


exports.DbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected Successfully...")
    } catch (error) {
        console.log("Some error in DB Connection" , error);
    }
}