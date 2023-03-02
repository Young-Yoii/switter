import { useState, useEffect } from 'react';
import { dbService } from './../firebase';
import { collection, addDoc, serverTimestamp, getDocs, query } from 'firebase/firestore';

const Home = () => {
  const [sweet, setSweet] = useState('');
  const [sweets, setSweets] = useState([]);
  const getSweets = async () => {
    const dBquery = query(collection(dbService, 'sweets'));
    const querySnapShot = await getDocs(dBquery);
    querySnapShot.forEach((doc) => {
      const sweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setSweets((prev) => [sweetObj, ...prev]);
    });
  };
  useEffect(() => {
    getSweets();
  }, []);
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
      {sweets.map((sweet) => (
        <div key={sweet.id}>
          <h4>{sweet.sweet}</h4>
        </div>
      ))}
    </div>
  );
};

export default Home;
