import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your sweet!"
              value={newSweet}
              required
              autoFocus
              onChange={onEditChange}
              className="formInput"
            />
            <input type="submit" value="Update" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{sweetObj.text}</h4>
          {sweetObj.attachmenturl && <img src={sweetObj.attachmenturl} />}
          {check && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Sweet;
