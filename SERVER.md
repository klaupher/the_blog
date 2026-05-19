# Servidor

Comandos para iniciar o site do zero:

```sh
# Ter o node instalado na maquina / servidor
# Instalar todos os pacotes
npm i
# Configure o .env.local
cp .env.local-example .env.local
# Configure o .env.local com os dados necessários
npm run migrate
# Seed é opcional
npm run seed

# build do next
npm run build
npm start # apenas para teste
```
