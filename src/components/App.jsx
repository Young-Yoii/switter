import Router from './Router';
import { useState } from 'react';
import { authService } from '../firebase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <Router isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Swetter</footer>
    </>
  );
}
export default App;
