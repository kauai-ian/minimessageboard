// page login
import { LoginFormData } from "../types";
import useLogin from "../hooks/useLogin";
import { Form } from "../components/Form";

// initial state
const initState = { username: "", password: "" };
// inputs of form
const inputs = [
  {
    type: "text",
    name: "username",
    label: "Username",
    isRequired: true,
  },
  {
    type: "text",
    name: "password",
    label: "Password",
    isRequired: true,
  },
];

// login hook has a state, handles login
const Login = () => {
  const { loading, login } = useLogin();

  const handleLogin = async (formData: unknown) => {
    const { username, password } = formData as LoginFormData
    await login({ username, password });
  };

  
  return (
    <>
      <Form
        title="Login"
        inputs={inputs}
        loading={loading}
        submit={handleLogin}
        initState={initState}
        cta="Login"
        link="/signup"
        linkPrompt="Don't have an account?"
        linkText="Sign up"
      />
    </>
  );
};
export default Login