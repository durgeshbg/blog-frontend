import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <h1>Blog</h1>
      <nav>
        <ul>
          <li>Home</li>
          <li>
            <Link to='/login'>LogIn/SignUp</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
