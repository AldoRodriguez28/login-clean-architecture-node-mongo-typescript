import { envs } from "./config";
import { MongoDatabase } from "./data/mongoDB";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

console.log('🚀 Iniciando app.ts...');


(async () => {
    await main();
})()

async function main() {
    console.log('🔧 Entrando a main()');

    MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })


    //- inicio de nuestro server
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })
        .start();
    console.log('✅ Server.start() invocado');
}