import { useState, useEffect } from 'react';
import { dbService } from './../firebase';
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from 'firebase/firestore';
import Sweet from './../components/Sweet';

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState('');
  const [sweets, setSweets] = useState([]);
  useEffect(() => {
    const dbQuery = query(collection(dbService, 'sweets'), orderBy('createdAt', 'desc'));
    onSnapshot(dbQuery, (snapshot) => {
      const sweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSweets(sweetArr);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, 'sweets'), {
      text: sweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
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
        <Sweet key={sweet.id} sweetObj={sweet} isOwner={sweet.creatorId === userObj.uid} />
      ))}
    </div>
  );
};

export default Home;
