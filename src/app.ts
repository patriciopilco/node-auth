import { envs } from "./config";
import { Server } from "./presentation/server";

(()=>{
    main();
})()

async function main() {
    // todo: await base de datos

    // todo: iniciar server
    console.log('Iniciando server!!!')
    new Server({
        port: envs.PORT
    }).start();
}
