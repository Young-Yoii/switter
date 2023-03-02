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
      <button onClick={onLogoutClick}>로그아웃</button>
    </>
  );
};

export default Profile;
