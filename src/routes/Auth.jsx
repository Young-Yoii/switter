import { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form>
        <input name="email" type="text" placeholder="이메일" required value={email} onChange={onChange} />
        <input name="password" type="password" placeholder="비빌번호" required value={password} onChange={onChange} />
        <input type="submit" value="로그인" onSubmit={onSubmit} />
      </form>
      <button>Google 계정으로 로그인</button>
      <button>Github 계정으로 로그인</button>
    </div>
  );
};

export default Auth;
