import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";


(async () => {
    await main()
})();

async function main() {
    MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    });

    // Crear una coleccion = tables, documento = registro
    const newLog = await LogModel.create({
        message: 'Test message from mongo',
        origin: 'app.ts',
        level: "low",
    });

    // Grabar en Mongo
    await newLog.save();

    console.log(newLog)

    const logs = await (await LogModel.find({level: 'medium'}))
    console.log(logs)

    // Server.start()
};

