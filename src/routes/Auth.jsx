import { useCallback, useState } from 'react';
import { authService } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const Auth = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const onChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setForm({
        ...form,
        [name]: value,
      });
    },
    [form]
  );
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(authService, form.email, form.password);
      } else {
        data = await signInWithEmailAndPassword(authService, form.email, form.password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const { name } = event.target;
    let provider;
    try {
      if (name === 'google') {
        provider = new GoogleAuthProvider();
        //const token = credential.accessToken;
      } else if (name === 'github') {
        provider = new GithubAuthProvider();
        //const token = credential.accessToken;
      }
      await signInWithPopup(authService, provider);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="이메일" required value={form.email} onChange={onChange} />
        <input name="password" type="password" placeholder="비빌번호" required value={form.password} onChange={onChange} />
        <input type="submit" value={newAccount ? '계정만들기' : '로그인'} />
      </form>
      <span onClick={toggleAccount}>{newAccount ? '로그인' : '계정만들기'}</span>
      <button name="google" onClick={onSocialClick}>
        Google 계정으로 로그인
      </button>
      <button name="github" onClick={onSocialClick}>
        Github 계정으로 로그인
      </button>
    </div>
  );
};

export default Auth;
