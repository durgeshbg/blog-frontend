import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ token, setToken }) => {
  return (
    <>
      <h1>Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            {token ? (
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('admin');
                  setToken(null);
                }}
              >
                Logout
              </button>
            ) : (
              <Link to='/login'>LogIn/SignUp</Link>
            )}
          </li>
          {localStorage.getItem('admin') === 'true' && (
            <li>
              <Link to={'/create'}>Create</Link>
            </li>
          )}
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
