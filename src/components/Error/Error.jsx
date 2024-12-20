import PropTypes from 'prop-types';

const Error = ({ status = 404, message = 'Page not found' }) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-dvh'>
      <h1 className='text-7xl mb-8 text-rose-700'>[{status}]</h1>
      <p className='text-3xl text-black-500 mb-20'>{message}! 😢</p>
      <svg
        width='150'
        height='150'
        viewBox='0 0 64 64'
        xmlns='http://www.w3.org/2000/svg'
        className='animate-bounce'
      >
        <polygon points='32,2 58,16 58,48 32,62 6,48 6,16' fill='#191919ff' />
        <circle cx='32' cy='32' r='8' fill='#ffd25aff' />
        <line x1='32' y1='10' x2='32' y2='24' stroke='#ffd25aff' strokeWidth='2' />
        <line x1='32' y1='40' x2='32' y2='54' stroke='#ffd25aff' strokeWidth='2' />
        <line x1='10' y1='32' x2='24' y2='32' stroke='#ffd25aff' strokeWidth='2' />
        <line x1='40' y1='32' x2='54' y2='32' stroke='#ffd25aff' strokeWidth='2' />
        <circle cx='32' cy='10' r='4' fill='#ffaa5aff' />
        <circle cx='32' cy='54' r='4' fill='#ffaa5aff' />
        <circle cx='10' cy='32' r='4' fill='#ffaa5aff' />
        <circle cx='54' cy='32' r='4' fill='#ffaa5aff' />
        <circle cx='19' cy='19' r='4' fill='#ffaa5aff' />
        <circle cx='45' cy='19' r='4' fill='#ffaa5aff' />
        <circle cx='19' cy='45' r='4' fill='#ffaa5aff' />
        <circle cx='45' cy='45' r='4' fill='#ffaa5aff' />
      </svg>

      <p className='text-3xl text-black-500'>__________</p>
      <p className='text-xl text-black-500' >
        Return back to <a className='text-black-700 underline underline-offset-4 hover:text-black-950 decoration-blue-ribbon-600 decoration-4 ' href='/'>homepage</a>
      </p>
    </div>
  );
};

Error.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string,
};

export default Error;
