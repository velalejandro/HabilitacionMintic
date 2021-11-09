const { response } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/User');
const { generarJWT } = require('../helpers/jwt');
const role = require('../models/Role');

const crearUsuario = async ( req, resp = response) => {

    const {email,password} = req.body;

    try {
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return resp.status(400).json({
                ok:false,
                msg: "ya existe un usuario registrado con este email"
            }); 
        }

        usuario = new Usuario(req.body);

        /** Encriptando la contrasena */
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        resp.status(201).json({
            ok:true,
            msg: 'Usuario creado satisfactoriamente',
            uid: usuario.id,
            name: usuario.name
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'error al guardar el registro',
        });
        
    }
}

const loginUsuario = async (req,resp = response) => {

    const { email, password } = req.body;

    try {

        /** Confirmar email */
        let usuario = await Usuario.findOne({email});

        if(!usuario){
            resp.status(400).json({
                ok: true,
                msg: 'Usuario o contrasena erradas'

            });
        }

        /** confirmar email */
        
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            resp.status(400).json({
                ok:true,
                msg: 'usuario o contrasena erradas'
            });
        }

        /** Generar Token*/
        const token = await generarJWT(usuario.id, usuario.name);

        resp.json({
            ok: true,
            msg: 'Ok',
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'error al autenticar',
        });
        
    }

}

const revalidarToken = async (req, resp = response) => {
    
    const { uid, name } = req;

    /** generar nuevo token*/
    const token = await generarJWT( uid, name );

    resp.json({
        ok: true,
        token: token
    });
}

const validarUsuarioGoogle = async (req, resp = response) => {
    
    const { uid:idToken, name, email } = req;

    try {
        let usuario = await Usuario
        .findOne({email,idToken })
        .populate('role');

        if(usuario){
            if(usuario.role.name === 'indefinido')
            {   
                 resp.status(401).json({
                     ok: false,
                     msg: 'El usuario aun no ha sido autorizado por el administrador'
                 });   
            }
            else
            {
                const token = await generarJWT(usuario.id,usuario.name);

                resp.json({
                    ok: true,
                    msg: 'Ok',
                    uid: usuario.id,
                    name: usuario.name,
                    token
                });
            }

        }else{
            usuario = new Usuario({
                name,
                user:'default',
                password: idToken,
                email,
                idToken
            });

            const newUser = await usuario.save();
            resp.status(201).json({
                ok:true,
                msg: 'Usuario creado satisfactoriamente',
                uid: newUser.id,
                name: newUser.name
            });
        }
    } catch (error) {
        console.log('erorees'+ error);
        
    }

    

    
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    validarUsuarioGoogle
};


