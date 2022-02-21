import { Link } from "react-router-dom";
import LoginForm from "../components/authentication/LoginForm";

const Login = () => {
  const sendLoginRequest = (formData) => {
    fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then(result => {
        if (result.errorMessage) {
          alert(`${result.errorMessage}`)
        } else {
          alert(`Welcome ${result.username}`)
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <section class="authenticationSection">
      <h1>로그인</h1>
      <LoginForm onSubmit={sendLoginRequest} />
      <p>
        회원가입 안 하셨나요? <Link to="/register">회원가입</Link> 하세요!
      </p>
    </section>
  );
};

export default Login;
