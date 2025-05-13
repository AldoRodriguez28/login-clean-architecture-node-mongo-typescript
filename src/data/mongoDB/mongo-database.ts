import mongoose from 'mongoose';

interface Options {
    mongoUrl: string,
    dbName: string

}

export class MongoDatabase {
    static async connect(Options: Options) {
        const { mongoUrl, dbName } = Options
        try {
            await mongoose.connect(mongoUrl, {
                dbName: dbName
            });
            console.log('🧪 Mongo database Connected!')
            return true;

        } catch (error) {
            console.log('🚨 Mongo connection error');
            throw error;
        }
    }
}