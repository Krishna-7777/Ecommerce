const express = require("express");
const cors = require("cors");
const { connect } = require("./config/db");
const { authRouter } = require("./routes/routes.auth");

const app = express();
app.use(cors());
app.use(express.json())

app.get('/', (ask, give) => {
    give.send('Welcome to Ecommerce Backend')
})

app.use('/api/auth', authRouter)

app.listen(4000, () => {
    try {
        connect
        console.log(`Connected to the DB and server is running at ${4000}`)
    } catch (error) {
        console.log(error);
        console.log("Error in connecting to the DB")
    }
})