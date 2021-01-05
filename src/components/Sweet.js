import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

const Sweet = ({ sweetObj, check }) => {
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);

  const toggleEditing = () => setEditing((prev) => !prev); //returns oposite previous value

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure want to Delete it?");
    if (ok) {
      await dbService.doc(`sweet/${sweetObj.id}`).delete();
      await storageService.refFromURL(sweetObj.attachmenturl).delete();
    }
  };

  const onEditChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewSweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`sweet/${sweetObj.id}`).update({ text: newSweet });
    setEditing(false);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your sweet!"
              value={newSweet}
              required
              onChange={onEditChange}
            />
            <input type="submit" value="Update" />
          </form>
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <>
          <h3>{sweetObj.text}</h3>
          {sweetObj.attachmenturl && (
            <img
              alt="123"
              src={sweetObj.attachmenturl}
              width="50px"
              height="50px"
            />
          )}
          {check && (
            <>
              <button onClick={onDeleteClick}>Delete sweet</button>
              <button onClick={toggleEditing}>Edit sweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sweet;
