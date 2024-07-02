import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <main>
        <div>main condinatinal render home or login/signup</div> <Outlet />
      </main>
    </>
  );
};

export default Main;
