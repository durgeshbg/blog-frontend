import PropTypes from 'prop-types';

const Error = ({ status = 404, message = 'Page not found' }) => {
  return (
    <div className='error'>
      <h1 className='head'>{status}</h1>
      <h2 className='message'>{message}</h2>
      <img className='loading' src='/icon.svg' alt='logo' />
    </div>
  );
};

Error.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string,
};

export default Error;
