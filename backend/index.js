const express = require("express");
const cors = require("cors");
const { connect } = require("./config/db");
const { authRouter } = require("./routes/routes.auth");
const { categoryRouter } = require("./routes/routes.category");
const { authorize } = require("./middlewares/authorize.mw");
const { productRouter } = require("./routes/routes.products");
const { cartRouter } = require("./routes/routes.cart");

const app = express();
app.use(cors());
app.use(express.json())

app.get('/', (ask, give) => {
    give.send('Welcome to Ecommerce Backend')
})

app.use('/api/auth', authRouter)
app.use('/api/list', categoryRouter)
app.use('/api', productRouter)

app.use(authorize)

app.use('/api/cart', cartRouter)

app.listen(4000, () => {
    try {
        connect
        console.log(`Connected to the DB and server is running at ${4000}`)
    } catch (error) {
        console.log(error);
        console.log("Error in connecting to the DB")
    }
})