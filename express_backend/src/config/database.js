import mongoose from "mongoose";
async function connectDb(mongoUri) {
  try {
    mongoose.set("strictQuery", false);

    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(
      `Connected to MongoDB ${connection.connection.host}:${connection.connection.port}`,
    );

    console.log(`database name: ${connection.connection.name}  `);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
export default connectDb;
