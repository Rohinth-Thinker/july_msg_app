import { useState } from "react";
import useSignup from "../../hooks/useSignup";


function Form() {

    const [ inputs, setInputs ] = useState({
        username : '',
        password : '',
    })
    const [ loading, signup ] = useSignup();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await signup(inputs);
            if (!response.status) {
                console.log(response.msg);
                return;
            }

            console.log(inputs);
            setInputs({username : '', password : ''});
            return;

        } catch(err) {
            console.log(`${err.name} : ${err.message}`);
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit} >
            <div className="container-form-elements">

                <input type="text" placeholder="Create your Username..."  onChange={(e) => {
                    setInputs({...inputs, username : e.target.value})}} value={inputs.username} />

                <input type="text" placeholder="Create your Password ..." onChange={(e) => {
                    setInputs({...inputs, password : e.target.value})}} value={inputs.password} />

                <button type="submit" disabled={loading}>Signup</button>

            </div>
        </form>
    )
}


export default Form;