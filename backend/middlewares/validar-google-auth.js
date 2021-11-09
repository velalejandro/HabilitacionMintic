const { response } = require('express');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('1001858888851-vj8amkbf92ph64lqmsrklsmvi45r82ck.apps.googleusercontent.com');

const validarGoogleAuth = (req, res = response, next) => {

    let token = '';
    token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No se ha proporcionado un toke valido'
        });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    try {
        //console.log('token google',token);
        client.verifyIdToken({
            idToken: token, audience: '1001858888851-vj8amkbf92ph64lqmsrklsmvi45r82ck.apps.googleusercontent.com'
        })
            .then((response) => {
                const { sub, name, email } = response.payload;
                console.log(sub, name, email);
                req.uid = sub;
                req.name = name;
                req.email = email;
                next();
            })
            .catch((err) => {
                console.log(err);
                return res.status(401).json({
                    ok: false,
                    msg: 'token invalido'
                });
            });

    } catch (error) {
        console.log(err);
        return res.status(401).json({
            ok: false,
            msg: 'token invalido'
        });
    }

}

module.exports = {
    validarGoogleAuth
};