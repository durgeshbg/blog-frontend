import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className='flex justify-center font-bold bg-blue-500 text-blue-50 rounded-b-md w-full fixed bottom-0 tracking-wider'>
        <p>
          Copyright &copy; 2024{' '}
          <Link
            className='hover:underline text-slate-900 underline-offset-3'
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
