import { Link } from 'react-router-dom';

import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <Link to='/'>열무 마켓</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to='/new-item'>물건올리기</Link>
          </li>
          <li>
            <Link to='/favorites'>위시리스트</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
