import { useState } from 'react';
import { dbService } from './../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Home = () => {
  const [sweet, setSweet] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, 'sweets'), {
      sweet,
      createdAt: serverTimestamp(),
    });
    setSweet('');
  };
  const onChange = (event) => {
    const value = event.target.value;
    setSweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={sweet} onChange={onChange} placeholder="당신의 생각은?" maxLength={120} />
        <input type="submit" value="Sweet" />
      </form>
    </div>
  );
};

export default Home;
