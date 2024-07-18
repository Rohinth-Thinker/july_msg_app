import { useState } from "react";
import useLogin from "../../hooks/useLogin";

function Form() {

    const [ inputs, setInputs ] = useState({
        username : '',
        password : '',
    })

    const [ loading, login ] = useLogin();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await login(inputs);
            if (!response.status) {
                return console.log(response.msg);
            }

            console.log(inputs);
            setInputs({username : '', password : ''});
            return;

        } catch (err) {
            console.log(`${err.name} : ${err.message}`);
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit} >
            <div className="container-form-elements">

                <input type="text" placeholder="Enter your Username..."  onChange={(e) => {
                    setInputs({...inputs, username : e.target.value})}} value={inputs.username} />

                <input type="text" placeholder="Enter your Password ..." onChange={(e) => {
                    setInputs({...inputs, password : e.target.value})}} value={inputs.password} />

                <button type="submit" disabled={loading}>Signin</button>

            </div>
        </form>
    )
}


export default Form;