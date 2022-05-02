import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { Link } from "react-router-dom";
import LoginForm from "../components/authentication/LoginForm";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const storedUserData = useSelector((state) => state.authSlice.userData);
  const history = useHistory();

  useEffect(() => {
    if (storedUserData.isLoggedIn) {
      alert(`Welcome ${storedUserData.username}`);
      history.push('/');
    }
  }, [storedUserData, history]);

  const sendLoginRequest = (formData) => {
    fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((result) => {
        if (result.errorMessage) {
          alert(`${result.errorMessage}`);
        } else {
          // Save the token in a cookie
          document.cookie = `token=${result.token}`
          // Save login data in Redux
          dispatch(
            login({
              isLoggedIn: true,
              userId: result.userId,
              username: result.username,
              avatar: result.avatar,
              token: result.token,
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="authenticationSection">
      <h1>로그인</h1>
      <LoginForm onSubmit={sendLoginRequest} />
      <p>
        회원가입 안 하셨나요? <Link to="/register">회원가입</Link> 하세요!
      </p>
    </section>
  );
};

export default Login;
