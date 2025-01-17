const express=require('express');
const app=express();
const methodOverride = require('method-override');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];
//principal
app.get('/', (req, res) => {
    res.send(
      `<h1>Street Figther Characters</h1>
      <ul>
      ${usuarios
        .map((usuario) => `<li>id:${usuario.id} · Nombre: ${usuario.nombre} | Edad:${usuario.edad} | Lugar de Procedencia: ${usuario.lugarProcedencia}
            <form action="/usuarios/${usuario.nombre}" method="POST" style="display inline;">
            <input type="hidden" name="_method" value="DELETE">
            <button type="submit">Eliminar</button>
            </form>

            <form action="/usuarios/${usuario.nombre}" method="POST" style="display: inline;">
            <input type="hidden" name="_method" value="PATCH">
            <label for="nombre">Nombre:</label>
            <input type="text" name="nombre" value="${usuario.nombre}" required><br><br>
            <label for="edad">Edad:</label>
            <input type="number" name="edad" value="${usuario.edad}" required><br><br>
            <label for="lugarProcedencia">Lugar de Procedencia:</label>
            <input type="text" name="lugarProcedencia" value="${usuario.lugarProcedencia}" required><br><br>
            <button type="submit">Actualizar</button>
            </form>
        </li>`)
        .join('')}
        <ul/>

        <form action="/usuarios" method="POST">
        <br>
        <label for"nombre">Nombre</label>
        <input type="text" id="nombre" name= "nombre"required><br><br>
        <label for"edad">Edad</label>
        <input type="number" id="edad" name= "edad"><br><br>
        <label for"lugarProcedencia">Lugar de Procedencia</label>
        <input type="text" id="lugarProcedencia" name= "lugarProcedencia"><br><br>
        <button type="submit">Agregar usuario</button><br><br>
        
        `
    );
  });

//create
app.get('/usuarios',(req,res)=>{
    res.json(usuarios);
    
});

app.get('/usuarios/:nombre',(req,res)=>{   
    const usuario=usuarios.find((user)=>user.nombre.toLowerCase()===req.params.nombre.toLowerCase());
    if(usuario){
        res.json(usuario);
    }else{
        res.status(404).json({mensaje:'Usuario no encontrado'});
    }
    
});

//post
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: req.body.nombre, //el cuerpo del envio y de eso el nombre
      edad:req.body.edad || null,
      lugarProcedencia:req.body.lugarProcedencia||null
    };
    usuarios.push(nuevoUsuario);
  
    res.redirect('/');
});
//findIndex devuelve -1 si no encuentra
app.patch('/usuarios/:nombre',(req,res)=>{
    const index=usuarios.findIndex((user)=>user.nombre.toLowerCase() ===req.params.nombre.toLowerCase());
    if(index==-1){
        res.status(404).json({mensaje:'Usuario no encontrado'});
    }else{
        usuarios[index]={
            ...usuarios[index],
            ...req.body,
        };
        res.json(usuarios[index]);
    }
});

app.delete('/usuarios/:nombre',(req,res)=>{
    const usuarioExiste=usuarios.some((user)=>user.nombre.toLowerCase()===req.params.nombre.toLowerCase());
    if(usuarioExiste){
        usuarios=usuarios.filter((user)=>user.nombre.toLowerCase()!==req.params.nombre.toLowerCase());
        /* res.json({mensaje:'Usuario eliminado'}); */
        res.redirect('/');
    }else{
        res.status(404).json({mensaje:'Usuario no encontrado'})
    }
    
})



app.listen(3000,()=>{
    console.log('Express está escuchando en http://localhost:3000')
})