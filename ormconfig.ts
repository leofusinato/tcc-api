
module.exports = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSSWORD,
    "database": process.env.DB_NAME,
    "entities": [
       "src/app/models/**/*.ts"
    ],
    "migrations": [
       "src/database/migrations/**/*.ts"
    ],
    "cli": {
        "migrationsDir": "src/database/migrations"
    }
 }