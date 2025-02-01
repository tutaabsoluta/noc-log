import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";


(async () => {
    await main()
})();

async function main() {
    MongoDatabase.connect({
        dbName: envs.MONGO_URL,
        mongoUrl: envs.MONGO_URL
    })
    Server.start()
};

