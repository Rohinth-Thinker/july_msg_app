

function validateInputs(inputs) {

    for (const inputName in inputs) {
        if ( !(inputs[inputName])  || !(inputs[inputName].replaceAll(' ', '')) ) {
            return { status : false, msg : `Invalid ${inputName}` };
        }
    }

    if ( inputs.password.length < 4 ) {
        return { status : false, msg : `password must be maximum than 4 characters` };
    }

    return { status : true };

}


export default validateInputs;