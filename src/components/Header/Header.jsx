import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ token, setToken }) => {
  return (
    <header className='flex justify-between items-center bg-blue-500 mb-5 tracking-wider'>
      <h2 className='text-5xl px-3 py-2 font-bold'>
        <Link to='/'>Blog</Link>
      </h2>
      <nav>
        <ul className='flex justify-between gap-2'>
          <li className='text-lg text-white font-semibold bg-orange-500 px-2 py-1 m-3 rounded'>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li className='text-lg text-white font-semibold bg-orange-500 px-2 py-1 m-3 rounded'>
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
              <NavLink to='/login'>LogIn/SignUp</NavLink>
            )}
          </li>
          {localStorage.getItem('admin') === 'true' && (
            <li className='text-lg text-white font-semibold bg-orange-500 px-2 py-1 m-3 rounded'>
              <NavLink to={'/create'}>Create</NavLink>
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
