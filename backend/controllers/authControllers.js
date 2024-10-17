const { findUser, createUser, findAndVerifyUser, createUserProfile } = require("../db/dbFunctions");
const setCookie = require("../utils/setCookie");
const { generateToken } = require("../utils/tokenFunctions");

async function signup(req, res) {
    try {
        const { username, password } = req.body;

        const validateInputsResponse = validateInputs({username, password});
        if (!validateInputsResponse.status) {
            return res.status(validateInputsResponse.statusCode).json({ error : validateInputsResponse.msg });
        }

        const user = await findUser(username);
        if (user) {
            return res.status(409).json({error : "username is aldready exists"});
        }
        
        const [ newUser, userProfile ] = await Promise.all([
            createUser(username, password),
            createUserProfile(username),
        ]);

        const token = generateToken(username);
        setCookie(res, token);
        
        res.status(200).json({msg : "signed up successfully...", userProfile});

    } catch(err) {
        console.log(`At signup Controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : "An error occured. Try again later..."});
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        const validateInputsResponse = validateInputs({username, password});
        if (!validateInputsResponse.status) {
            return res.status(validateInputsResponse.statusCode).json({error : validateInputsResponse.msg})
        }

        const user = await findAndVerifyUser(username, password);
        if (!user.status) {
            return res.status(user.statusCode).json({error : user.msg});
        }

        const token = generateToken(username);
        setCookie(res, token);

        res.status(200).json({msg : "logged in successfully..."});
    } catch(err) {
        console.log(`At login controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : "An error occured, Try again later..."});
    }
}

function logout(req, res) {
    try {
        setCookie(res, "", 0);
        res.status(200).json({msg : "logged out successfully..."});
    } catch(err) {
        console.log(`At logout controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : "An error occured, Try again later..."});
    }
}



function validateInputs(inputs) {
    for (const inputName in inputs) {
        if ( !(inputs[inputName])  || !(inputs[inputName].replaceAll(' ', '')) ) {
            return { status : false, statusCode : 422, msg : `Invalid ${inputName}` };
        }
    }

    if ( inputs.password.length <= 4 ) {
        return { status : false, statusCode : 422, msg : `password must be maximum than 4 characters` };
    }

    return { status : true };

}

module.exports = { signup, login, logout };

