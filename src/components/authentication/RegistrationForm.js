import { useRef } from "react";
import "./LoginForm.css";

const RegistrationForm = (props) => {
  const usernameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const submitRegistrationForm = (e) => {
    e.preventDefault();
    const formPayload = {
      username: usernameInput.current.value,
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };
    props.onSubmit(formPayload);
  };

  return (
    <form onSubmit={submitRegistrationForm}>
      <div>
        <label>닉네임</label>
        <input type="text" ref={usernameInput}></input>
      </div>
      <div>
        <label>이메일</label>
        <input type="email" ref={emailInput}></input>
      </div>
      <div>
        <label>비밀번호</label>
        <input type="password" ref={passwordInput}></input>
      </div>
      <button>회원가입</button>
    </form>
  );
};

export default RegistrationForm;
