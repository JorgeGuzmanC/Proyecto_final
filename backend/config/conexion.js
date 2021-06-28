const mysql = require('mysql');               // conexion a la base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin12345',
    port:3306,
    database: 'clinica'
});

conexion.connect((err)=>{
    if(err){
        console.log('ha ocurrido un error: '+ err)
    }else{
        console.log('Se ha establecido la conexión con la base de datos.')
    }
});

module.exports= conexion;