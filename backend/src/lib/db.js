import moongoose from 'mongoose';



export const connectDB = async () => {
  try {
    await moongoose.connect(process.env.MONGO_CONNECTION);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}