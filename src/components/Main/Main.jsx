import { useParams } from 'react-router-dom';
import Login from '../Form/Login';
import Register from '../Form/Register';
import Home from '../Home/Home';
import Error from '../Error/Error';
import PropTypes from 'prop-types';
import './Main.css';
import PostDisplay from '../PostDisplay/PostDisplay';

const Main = ({ token, setToken }) => {
  const { path } = useParams();
  const IS_OBJECT_ID = /^[0-9a-fA-F]{24}$/.test(path);
  return (
    <>
      <main>
        {path === 'login' ? (
          <Login setToken={setToken} token={token} />
        ) : path === 'register' ? (
          <Register setToken={setToken} token={token} />
        ) : path === 'home' || path === undefined ? (
          <Home token={token} />
        ) : IS_OBJECT_ID ? (
          <PostDisplay id={path} />
        ) : (
          <Error />
        )}
      </main>
    </>
  );
};

Main.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func,
};

export default Main;
