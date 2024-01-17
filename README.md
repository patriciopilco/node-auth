# API Autorizacion y Registro con NODE


### Crer package.json
``` bash
npm init -y
```

### Configuracion node y typescript

https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b

```bash
npm i -D typescript @types/node ts-node-dev rimraf
npx tsc --init --outDir dist/ --rootDir src

```
package.json

```bash
"scripts" : {
"dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"
  },
```

### Variables de entorno

- Realizar la instalacion para versiones de node menor a 20.x.x

```bash
npm i dotenv env-var
```

### Expression Regular para valira Email

```bash
export class Validators {
  static get email() {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  } 
}
```

### Generar codigos random

```bash
openssl rand -hex 12
```

### Variables de entorno para pruebas 
```bash
PORT=3000
MONGO_URL=mongodb://mongo-user:123456@localhost:27017
MONGO_DB_NAME=security
JWT_SECRET=3bec6270906972aa535e0ca0
```

## Ejecuta el entorno desarrollo

1. Crear el archivo .env
2. Crear variables de entorno
3. Intalar dependencia
```bash
npm install
```
4. Levantar mongodb en docker
```bash
docker compose up -s
```
5. Ejecutar en modo desarrollo
```bash
npm run dev
```