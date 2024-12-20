import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ token, setToken }) => {
  return (
    <header className='flex justify-between items-baseline py-3 px-2'>
      <h2 className='text-2xl md:text-5xl font-bold text-blue-600'>
        <Link to='/'>Blog</Link>
      </h2>
      <nav>
        <ul className='flex gap-5 items-baseline'>
          <li className='md:text-xl'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive
                  ? 'underline underline-offset-4 decoration-4 font-bold text-blue-ribbon-500'
                  : ''
              }
            >
              Home
            </NavLink>
          </li>
          <li className='md:text-xl'>
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
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'underline underline-offset-4 decoration-4 font-bold text-blue-ribbon-500'
                    : ''
                }
                to='/login'
              >
                LogIn/SignUp
              </NavLink>
            )}
          </li>
          {localStorage.getItem('admin') === 'true' && (
            <li className='md:text-xl'>
              <NavLink
                to={'/create'}
                className={({ isActive }) =>
                  isActive
                    ? 'underline underline-offset-4 decoration-4 font-bold text-blue-ribbon-500'
                    : ''
                }
              >
                Create
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func,
};

export default Header;
