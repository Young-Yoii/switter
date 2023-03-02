import Router from './Router';
import { useEffect, useState } from 'react';
import { authService } from '../firebase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <Router isLoggedIn={isLoggedIn} /> : 'loading...'}
      <footer>&copy; {new Date().getFullYear()} Swetter</footer>
    </>
  );
}
export default App;
