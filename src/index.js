const express = require('express');
const productRoutes = require("./routes/productRoutes");
const app = express()

app.use(express.json())
app.use('/products', productRoutes)



const PORT = 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message)
  
  }
  console.log("Server is up and running on port " + PORT)
  
})