# SQL Server Connection Implementation Plan

## Steps:
1. [x] Create package.json with dependencies (express, mssql, cors, dotenv, nodemon)
2. [x] Create .env.example with SQL Server connection details (user to fill)
3. [x] Create server.js: Express server with mssql pool, CRUD APIs for clientes/mascotas/productos
4. [x] Create SQL table creation script (tables.sql)
5. [x] Update service/client-service.js: Change API base to localhost:3000/api/clientes
6. [x] Update service/pet-service.js: Change to /api/mascotas
7. [x] Update service/producto-service.js: Change to /api/productos
8. [x] Remove service/db.js and db.json
9. [x] Update .gitignore for node_modules, .env
10. [x] Run `npm install`
11. [ ] Test server with `npm start`
12. [ ] [COMPLETE]
