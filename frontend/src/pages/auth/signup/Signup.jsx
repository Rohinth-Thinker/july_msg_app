import useAuth from "../../../hooks/useAuth";
import AuthForm from "../components/AuthForm";

function Signup() {

    const [ loading, authenticate ] = useAuth("signup");

    return (
        <AuthForm 
            onSubmit={authenticate}
            loading={loading}
            placeholder={{ username : 'Create your username...', password : 'Create your password...' }}
            buttonText={'SIGN UP'}
        />
    )
}

export default Signup;