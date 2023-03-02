import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { dbService, storageService } from './../firebase';
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Sweet from './../components/Sweet';

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState('');
  const [sweets, setSweets] = useState([]);
  const [images, setImages] = useState();
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
    let fileUrl = '';
    if (!fileUrl === '') {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, images, 'data_url');
      fileUrl = await getDownloadURL(response.ref);
    }
    const sweetObj = {
      text: sweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
      fileUrl,
    };
    await addDoc(collection(dbService, 'sweets'), sweetObj);
    setSweet('');
    setImages('');
  };
  const onChange = (event) => {
    const value = event.target.value;
    setSweet(value);
  };
  const onFileChange = (event) => {
    const file = event.target.files;

    const theFile = file[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const result = finishedEvent.currentTarget.result;
      setImages(result);
    };
    theFile && reader.readAsDataURL(theFile);
  };
  const onClearImages = () => setImages(''); // const handleAddImages = (event) => {
  //   const imageLists = event.target.files;
  //   let imageUrlLists = [...showImages];

  //   for (let i = 0; i < imageLists.length; i++) {
  //     const currentImageUrl = URL.createObjectURL(imageLists[i]);
  //     imageUrlLists.push(currentImageUrl);
  //   }

  //   if (imageUrlLists.length > 10) {
  //     imageUrlLists = imageUrlLists.slice(0, 10);
  //   }

  //   setShowImages(imageUrlLists);
  // };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={sweet} onChange={onChange} placeholder="당신의 생각은?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} multiple />
        <input type="submit" value="Sweet" />
        {/* {images && images.map((image) => <img src={image} width="50px" height="50px" alt="img" />)} */}
        {images && (
          <div>
            <img src={images} width="50px" height="50px" alt="img" />
            <button onClick={onClearImages}>Clear</button>
          </div>
        )}
      </form>
      {sweets.map((sweet) => (
        <Sweet key={sweet.id} sweetObj={sweet} isOwner={sweet.creatorId === userObj.uid} />
      ))}
    </div>
  );
};

export default Home;
