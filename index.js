const express = require('express');
const cors = require('cors');
const routerApi = require('./routes')
const {logErrors,errorHandler,boomErrorHandler} = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
const whilelist = ['http://127.0.0.1:5500','https://myapp.co']
const options = {
  origin:(origin,callback)=>{
    if( whilelist.includes(origin)|| !origin)
    {
      callback(null,true)
    }
    else{
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options));

app.get('/',(req,res)=>{
  res.send('Hola mi server en express');
})
app.get('/nueva-ruta',(req,res)=>{
  res.send('Hola, soy una nueva ruta');
})

routerApi(app);

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port,()=>{
  console.log('Mi port ' + port);
});