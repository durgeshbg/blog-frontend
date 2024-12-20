import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className='text-black-500 text-xs mb-2 flex justify-end mr-2 mt-2'>
        <p className='bg-black-200 px-2'>
          Copyright &copy; 2024{' '}
          <Link
            className='underline decoration-4 underline-offset-4 decoration-shakespeare-400 hover:decoration-blue-ribbon-500'
            to='https://github.com/durgeshbg/blog-frontend'
            target='_blank'
          >
            @durgeshbg
          </Link>{' '}
        </p>
      </footer>
    </>
  );
};

export default Footer;
