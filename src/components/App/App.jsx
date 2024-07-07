import { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <>
      <Header token={token} setToken={setToken} />
      <main>
        <Outlet context={[token, setToken]} />
      </main>
      <Footer />
    </>
  );
};

export default App;
