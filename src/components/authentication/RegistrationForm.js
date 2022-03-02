import { useRef } from "react";
import "./LoginForm.css";

const RegistrationForm = (props) => {
  const usernameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const submitRegistrationForm = (e) => {
    // prepares the form data for Register.js
    e.preventDefault();
    const image = e.target[3].files[0];
    const formData = {
      username: usernameInput.current.value,
      email: emailInput.current.value,
      password: passwordInput.current.value,
      image: image,
    };
    props.onSubmit(formData);
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
      <div>
        <label>아바타</label>
        <input type="file"></input>
        {props.uploadProgress !== 0 && <p>Upload {props.uploadProgress} % completed.</p>}
      </div>
      <button>회원가입</button>
    </form>
  );
};

export default RegistrationForm;
