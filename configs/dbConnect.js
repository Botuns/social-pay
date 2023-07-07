const { default: mongoose } = require("mongoose")

//connects to the database:(mongodb)
const dbConnect = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI, {})
        console.log(`MongoDB connected sucessfully`);

    } catch (error) {
        throw new Error(`Error connecting to the database: ${error}`);
    }
}
module.exports = dbConnect;