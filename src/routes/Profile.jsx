import { useNavigate } from 'react-router-dom';
import { authService } from '../firebase';

const Profile = () => {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    authService.signOut();
    navigate(-1);
  };
  return (
    <>
      <button onClick={onLogoutClick}>๋ก๊ทธ์์</button>
    </>
  );
};

export default Profile;
