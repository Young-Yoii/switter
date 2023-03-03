import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { dbService, storageService } from './../firebase';
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy, updateDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Sweet from './../components/Sweet';

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState('');
  const [sweets, setSweets] = useState([]);
  const [images, setImages] = useState([]);
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
    try {
      const sweetObj = await addDoc(collection(dbService, 'sweets'), {
        text: sweet,
        createdAt: serverTimestamp(),
        creatorId: userObj.uid,
      });
      let imagesArray = [];
      images.map(async (image) => {
        const imageRef = ref(storageService, `${userObj.uid}/${v4()}`);
        const response = await uploadString(imageRef, image, 'data_url');
        await getDownloadURL(response.ref).then((res) => imagesArray.push(res));
        await updateDoc(doc(dbService, 'sweets', `${sweetObj.id}`), { image: imagesArray });
      });
      setSweet('');
      setImages([]);
    } catch (err) {
      console.error(err);
    }
  };
  const onChange = (event) => {
    const value = event.target.value;
    setSweet(value);
  };
  const onFileChange = (event) => {
    const fileArr = event.currentTarget.files;

    let fileURLs = [];
    let file;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      let fileReader = new FileReader();
      file = fileArr[i];
      fileReader.onload = () => {
        fileURLs[i] = fileReader.result;
        setImages((prev) => [...fileURLs]);
      };
      fileReader.readAsDataURL(file);
    }
  };
  const onClearImages = () => setImages([]);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={sweet} onChange={onChange} placeholder="당신의 생각은?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} multiple />
        <input type="submit" value="Sweet" />
        {images &&
          images.map((image) => (
            <div>
              <img src={image} width="50px" height="50px" alt="img" />
              <button onClick={onClearImages}>Clear</button>
            </div>
          ))}
      </form>
      {sweets.map((sweet) => (
        <Sweet key={sweet.id} sweetObj={sweet} isOwner={sweet.creatorId === userObj.uid} />
      ))}
    </div>
  );
};

export default Home;
