import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://nadamostafa5:Nadam@grad.httqa.mongodb.net/SmartFarmingDB?retryWrites=true&w=majority';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB connected to Atlas');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};
