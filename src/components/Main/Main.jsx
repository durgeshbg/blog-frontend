import { useParams } from 'react-router-dom';
import Login from '../Form/Login';
import Register from '../Form/Register';
import Home from '../Home/Home';
import Error from '../Error/Error';
import PropTypes from 'prop-types';

const Main = ({ token, setToken }) => {
  const { path } = useParams();
  return (
    <>
      <main>
        {path === 'login' ? (
          <Login setToken={setToken} token={token} />
        ) : path === 'register' ? (
          <Register setToken={setToken} token={token} />
        ) : path === 'home' || path === undefined ? (
          <Home token={token} />
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
