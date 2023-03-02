import { dbService } from '../firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useState, useCallback } from 'react';

const Sweet = ({ sweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);
  const sweetTextRef = doc(dbService, 'sweets', `${sweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm('삭제하시겠습니까?');
    ok && (await deleteDoc(sweetTextRef));
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = useCallback((event) => {
    const value = event.target.value;
    setNewSweet(value);
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(sweetTextRef, { text: newSweet });
    setEditing((prev) => !prev);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input value={newSweet} placeholder="당신의 생각을 수정" onChange={onChange} required />
            <button onClick={toggleEditing}>cancle</button>
            <input type="submit" value="업데이트" />
          </form>
        </>
      ) : (
        <>
          <h4>{sweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sweet;
