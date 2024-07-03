import { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <>
      <Header token={token} setToken={setToken} />
      <Main token={token} setToken={setToken} />
      <Footer />
    </>
  );
};

export default App;
