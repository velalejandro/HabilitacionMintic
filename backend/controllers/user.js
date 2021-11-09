const { response } = require('express');
const User = require('../models/User');
const role = require('../models/Role');


const getUsers = async ( req, resp = response ) => {

    const users = await User.find()
                            .populate('role');    
    resp.status(200).json({
        ok:true,
        msg: 'List Users',
        users
    });
}


const setUser = async ( req, resp = response ) => {

    const user = new User(req.body);

    try {

        const us = await user.save();
        resp.status(201).json({
            ok:true,
            msg: 'usuario creado',
            user:us
        });
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg: 'error al crear el usuario',
        });
    }

    resp.json({
        ok:true,
        msg: 'Create User'
    });
}


const updateUser =  ( req, resp = response ) => {
    
    //const user = await User.findById

    resp.json({
        ok:true,
        msg: 'Update User',
        user
    });
}


const deleteUser = ( req, resp = response ) => {


    resp.json({
        ok:true,
        msg: 'Delete User'
    });
}

module.exports = {
    getUsers,
    setUser,
    updateUser,
    deleteUser
}