import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";

function AuthForm({ onSubmit, loading, placeholder, buttonText }) {

    const [ inputs, setInputs ] = useState({
        username : '',
        password : '',
    })

    const { setAuthUser } = useAuthContext();


    async function handleSubmit(e) {
        e.preventDefault();
            const response = await onSubmit(inputs);
            if (!response.status) {
                return console.log(response.msg);
            }

            console.log(inputs);

            setAuthUser({username : inputs.username});
            localStorage.setItem('user', JSON.stringify({username : inputs.username}));
            setInputs({username : '', password : ''});

            return;

       
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit} >
            <div className="container-form-elements">

                <input type="text" placeholder={placeholder.username}  onChange={(e) => {
                    setInputs({...inputs, username : e.target.value})}} value={inputs.username} />

                <input type="text" placeholder={placeholder.password} onChange={(e) => {
                    setInputs({...inputs, password : e.target.value})}} value={inputs.password} />

                <button type="submit" disabled={loading}>{ buttonText }</button>

            </div>
        </form>
    )
}


export default AuthForm;
