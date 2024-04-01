// signup form page
import { Form } from "../components/Form";
import useSignup from "../hooks/useSignup";
import { SignupFormData } from "../types";
// has initial state
const initState = {
    username: "",
    password: "",
}

// has inputs username, password, confirm password
const inputs = [
    {
        type: "text",
        name: 'username',
        label: 'Username',
        isRequired: true,
    }, {
        type: 'text',
        name: 'password',
        label: 'Password',
        isRequired: true,
    }
]
// signup function manages state when handlesignup is called and 
const Signup = () => {
const { loading, signup} = useSignup()

const handleSignup = async (
    formData: unknown
) => {
    const {username, password } = formData as SignupFormData
    await signup({username, password})
}
return (
<Form 
title="Sign up"
inputs={inputs}
loading={loading}
submit={handleSignup}
initState={initState}
cta='signup'
link='/'
linkPrompt="Already have an account?"
linkText="Login"

/>
)
}
export default Signup
// collects the username, pw and runs register function. 
// displays the signup Form component