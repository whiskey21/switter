import React, { useState } from "react";
import { dbService } from "../fbase";

const Sweet = ({ sweetObj, check }) => {
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);

  const toggleEditing = () => setEditing((prev) => !prev); //returns oposite previous value

  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure want to Delete it?");
    if (ok) {
      return dbService.doc(`sweet/${sweetObj.id}`).delete();
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
    console.log(sweetObj, newSweet);
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
