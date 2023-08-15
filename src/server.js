require("express-async-errors");

const AppError = require("./util/AppError")
const express = require("express");
const app = express();
const PORT = 3000;
const database = require("./database/sqlite")

const routes = require("./routes/index");

app.use(express.json())
app.use(routes);
database();

app.use((error, request, response, next)=> {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.log(error);

    return response.status(500).json({
        status: "error",
        message: "INTERNAL SERVER ERROR"
    })
})

app.listen(PORT, () => console.log(`SERVIDOR RODANDO NA PORTA ${PORT}`));
