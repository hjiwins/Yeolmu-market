import { Link } from "react-router-dom";
import { useEffect } from "react";
import RegistrationForm from "../components/authentication/RegistrationForm";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const storedUserData = useSelector(state => state.authSlice.userData);
  useEffect(() => {
    storedUserData.isLoggedIn && alert(
      `The account ${storedUserData.username} has been registered successfully!`
    );
  }, [storedUserData])

  const sendRegistrationRequest = (formData) => {
    fetch("http://localhost:3000/api/user/register", {
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
          return dispatch(register({
            isLoggedIn: true,
            userId: result.userId,
            username: result.username,
          }));
        }
      })
      .catch((error) => console.log(error));

    
  };

  return (
    <section class="authenticationSection">
      <h1>회원가입</h1>
      <RegistrationForm onSubmit={sendRegistrationRequest} />
      <p>
        이미 회원가입 하셨나요? <Link to="/login">로그인하세요!</Link>
      </p>
    </section>
  );
};

export default Register;
