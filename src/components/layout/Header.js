import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Header.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

function Header() {
  const dispatch = useDispatch();

  const storedUserData = useSelector((state) => state.authSlice.userData);
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">열무 마켓</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/new-item">물건올리기</Link>
          </li>
          <li>
            <Link to="/favorites">위시리스트</Link>
          </li>
          {storedUserData.isLoggedIn && (
            <li>
              <img
                className={styles.userAvatar}
                height="75px"
                width="75px"
                alt="user avatar"
                src={storedUserData.avatar}
              ></img>
            </li>
          )}
          {storedUserData.isLoggedIn ? (
            <li>{storedUserData.username}님</li>
          ) : (
            <li>
              <Link to="/login">로그인</Link>
            </li>
          )}
          {storedUserData.isLoggedIn && (
            <li onClick={() => dispatch(logout())}>
              <Link to='/'>
                로그아웃
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
