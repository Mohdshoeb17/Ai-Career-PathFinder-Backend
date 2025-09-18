const express =require('express');
const db=require('./db')
  const cors =require('cors');
   const dotenv = require('dotenv');
   const Airoute = require('./Routes/AiRoutes');
const Authroute = require('./Routes/AuthRoute');
    dotenv.config();
    db() 
    const app = express();
    app.use(cors()); 
    app.use(express.json()); 
    app.use('/auth',Airoute)
    app.use('/auth',Authroute)
 app.listen(8000, () => console.log(" Server running on 8000"))
  