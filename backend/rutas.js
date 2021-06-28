const router = require('express').Router();
const conexion = require('./config/conexion');

//ASIGNACION DE RUTAS

//get usuarios
router.get('/',(req,res)=>{
    
    let sql = 'select * from tb_usuarios'
    conexion.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
});

//get un usuario
router.get('/:rut',(req,res)=>{
    const{rut} = req.params
    let sql = 'select * from tb_usuarios where rut = ?'
    conexion.query(sql,[rut],(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
});

//agregar usuario
router.post('/',(req, res)=>{
    const{rut, nombres, apellidos, direccion, region, comuna, correo, contraseña, pregunta, respuesta} = req.body;
    let sql = `insert into tb_usuarios(rut, nombres, apellidos, direccion, region, comuna, correo, contra, pregunta, respuesta) 
                values('${rut}', '${nombres}', '${apellidos}', '${direccion}', '${region}', '${comuna}', '${correo}', md5('${contraseña}'), '${pregunta}', md5('${respuesta}'))`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'usuario agregado' })
        }
    })
})

//login
router.get('/login/:rut/:contra',(req,res)=>{
    const rut=req.params.rut
    const contra=req.params.contra
    conexion.query("SELECT * FROM tb_usuarios where rut=? and contra=md5(?)",[rut,contra],(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//lista de todas las citas
router.get('/citas/lista',(req,res)=>{
    let sql = 'select * from citas '
    conexion.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//cita de un usuario
router.get('/citas/:rut',(req,res)=>{
    const rut=req.params.rut
    conexion.query("SELECT * FROM citas where paciente_Rut=? ",rut,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
 
})

//buscar cita por id 
router.get('/citas/id/:id',(req,res)=>{
    const id=req.params.id
    conexion.query("SELECT * FROM citas where idcitas=? ",id,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//agregar cita
router.post('/citas',(req, res)=>{
    const{idcitas,paciente_Rut, id_medico, motivo, descripcion, estado, fecha, hora} = req.body
    let sql = `insert into citas(idcitas, paciente_Rut, id_medico, motivo, descripcion, estado, fecha, hora) 
                values('${idcitas}', '${paciente_Rut}', '${id_medico}', '${motivo}', '${descripcion}', '${estado}', '${fecha}', '${hora}')`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'usuario agregado' })
        }
    })
})

//eliminar cita
router.delete('/citas/:id',(req, res)=>{
    const{id} = req.params
    let sql = `delete from citas where idcitas = '${id}'`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'cita eliminada'})
        }
    })
})

//editar cita
router.put('/citas/:id',(req, res)=>{
    const{id}=req.params
    const{paciente_Rut, id_medico, motivo, descripcion, estado, fecha, hora} = req.body
    let sql = `update citas set 
                paciente_Rut = '${paciente_Rut}',
                id_medico = '${id_medico}',
                motivo = '${motivo}',
                descripcion = '${descripcion}',
                estado = '${estado}',
                fecha = '${fecha}',
                hora = '${hora}'
                where idcitas = '${id}'`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'cita modificada'})
        }
    })
})

//get medico
router.get('/medico/:id',(req,res)=>{
    const id=req.params.id
    conexion.query("SELECT * FROM medicos where idmedicos=? ",id,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
 
})

//recuperar contra
router.get('/recuperar/:rut/:resp',(req,res)=>{
    const rut= req.params.rut
    const resp= req.params.resp
    conexion.query("SELECT * FROM tb_usuarios where rut=? and respuesta=md5(?)", [rut,resp], (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
 
})

//cambiar contra
router.put('/cambiarContra/:rut',(req,res)=>{
    const {rut}= req.params
    const {respuesta}=req.body
    conexion.query(`update tb_usuarios set contra = md5('${respuesta}') where rut = '${rut}'`, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status: 'contra modificada'})
        }
    })
 
})

module.exports= router;