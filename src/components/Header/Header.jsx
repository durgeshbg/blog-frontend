import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ token, setToken }) => {
  return (
    <>
      <h1>Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          <li>
            {token ? (
              <Link
                to='/login'
                onClick={() => {
                  localStorage.removeItem('token');
                  setToken(null);
                }}
              >
                Logout
              </Link>
            ) : (
              <Link to='/login'>LogIn/SignUp</Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

Header.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func,
};

export default Header;
