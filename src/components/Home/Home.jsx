import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Home.css';

const Home = ({ token }) => {
  if (!token) return <Navigate to={'/login'} />;
  return (
    <>
      <div>get all posts</div>
    </>
  );
};

Home.propTypes = {
  token: PropTypes.string,
};

export default Home;
