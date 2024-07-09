import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer>
        Copyright &copy; 2024{' '}
        <Link to='https://github.com/durgeshbg/blog-frontend' target='_blank'>
          durgeshbg
        </Link>{' '}
      </footer>
    </>
  );
};

export default Footer;
