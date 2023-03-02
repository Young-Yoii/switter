import { useCallback, useState } from 'react';
import { authService } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Auth = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [newAccount, setNewAccount] = useState(true);
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="이메일" required value={form.email} onChange={onChange} />
        <input name="password" type="password" placeholder="비빌번호" required value={form.password} onChange={onChange} />
        <input type="submit" value={newAccount ? '계정만들기' : '로그인'} />
      </form>
      <button>Google 계정으로 로그인</button>
      <button>Github 계정으로 로그인</button>
    </div>
  );
};

export default Auth;
