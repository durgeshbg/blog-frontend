import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const App = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <>
      <Header token={token} setToken={setToken} />
      <main className='min-h-dvh'>
        <Outlet context={[token, setToken]} />
      </main>
      <Footer />
    </>
  );
};

export default App;
