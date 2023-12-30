# node-auth


Crer package.json
``` bash
npm init -y
```

Configuracion node y typescript

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

Variables de entorno

- Realizar la instalacion para versiones de node menor a 20.x.x

```bash
npm i dotenv env-var
```