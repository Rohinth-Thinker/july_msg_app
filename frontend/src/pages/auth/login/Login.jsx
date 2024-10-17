import useAuth from "../../../hooks/useAuth";
import AuthForm from "../components/AuthForm";

function Login() {

    const [ loading, authenticate ] = useAuth("Login");
    
    return (
        <AuthForm 
            onSubmit={authenticate}
            loading={loading}
            placeholder={{ username : 'Enter your username...', password : 'Enter your password...' }}
            buttonText={'signin'}
        />
    )
}

export default Login;