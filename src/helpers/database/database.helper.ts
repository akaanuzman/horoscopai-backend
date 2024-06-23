import mongoose from "mongoose";
import { config } from "../../config/config";

/**
 * @description This is a singleton class for the database connection or other features.
 * @class DatabaseHelper
 * @method shared - This is a static method that returns the shared instance of the class.
 * @method connectToMongoDB - This method is used to connect to the MongoDB.
 */
class DatabaseHelper {
    private static instance: DatabaseHelper | null = null;

    private constructor() { }

    static shared(): DatabaseHelper {
        if (!DatabaseHelper.instance) {
            DatabaseHelper.instance = new DatabaseHelper();
        }
        return DatabaseHelper.instance;
    }

    /**
     * @description This method is used to connect to the MongoDB.
     */
    connectToMongoDB = async () => {
        try {
            await mongoose.connect(config.mongoUri!);
            console.log('MongoDB connected');
        } catch (error) {
            console.error(error);
        }
    }

}

export default DatabaseHelper.shared();