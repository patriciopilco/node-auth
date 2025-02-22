import { env } from "process";
import { envs } from "./config";
import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(()=>{
    main();
})()

async function main() {
    // todo: await base de datos
    await MongoDatabase.connect({
        mongoUrl:envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME
    })

    // todo: iniciar server
    console.log('Iniciando server!!!')
    new Server({
        port: envs.PORT_APP,
        routes: AppRoutes.routes
    }).start();
}

