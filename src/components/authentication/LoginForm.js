import { useRef } from "react";
import "./LoginForm.css";

const LoginForm = (props) => {
  const emailInput = useRef();
  const passwordInput = useRef();

  const submitLoginForm = (e) => {
    e.preventDefault();
    const formPayload = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };
    props.onSubmit(formPayload);
  };

  return (
    <form onSubmit={submitLoginForm}>
      <div>
        <label>이메일</label>
        <input type="email" ref={emailInput}></input>
      </div>
      <div>
        <label>비밀번호</label>
        <input type="password" ref={passwordInput}></input>
      </div>
      <button>로그인</button>
    </form>
  );
};

export default LoginForm;
