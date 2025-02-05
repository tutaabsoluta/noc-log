import mongoose from "mongoose";

// avoid hidden dependencies
interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
};

export class MongoDatabase {
    static async connect ( options: ConnectionOptions ) {
        const { mongoUrl, dbName } = options;

        try {

            await mongoose.connect( mongoUrl, {
                dbName: dbName,
            } );

            // console.log('Mongo connected!');
            return true;

        } catch (error) {
            // console.log('Mongo connection error');
            throw error;
        }
    };
};