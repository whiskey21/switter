import React, { useEffect, useState } from "react";
import Sweet from "../components/Sweet";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]);
  const [attachment, setAttachment] = useState(null);

  const getSweets = () => {
    dbService.collection("sweet").onSnapshot((snap) => {
      const dbArray = snap.docs.map((document) => ({
        id: document.id, //its not same with createdID
        ...document.data(),
      }));
      setSweets(dbArray);
      console.log("getsweet");
    });
  };

  useEffect(() => {
    getSweets();
    console.log("homeeffect");
  }, []);

  const onSubmit = async (event) => {
    if (sweet === "") {
      return;
    }
    event.preventDefault();
    let attachmenturl = "";
    if (attachment !== null) {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const uploadResponse = await fileRef.putString(attachment, "data_url");
      attachmenturl = await uploadResponse.ref.getDownloadURL();
    }
    const insertObj = {
      text: sweet,
      createdAt: Date.now(),
      createdId: userObj.uid,
      attachmenturl,
    };
    await dbService.collection("sweet").add(insertObj);
    setSweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweet(value);
  };

  const onChangeFile = (event) => {
    const {
      target: { files },
    } = event;
    if (files.length !== 0) {
      //파일선택안하고 취소할시 생성되는 bugfix
      const theFile = files[0]; //theFile의 format : File
      const reader = new FileReader();
      reader.readAsDataURL(theFile); //특정file에서 읽어오는역활
      reader.onloadend = (event) => {
        //eventListner에서 읽어옴
        const {
          currentTarget: { result },
        } = event;
        setAttachment(result);
      };
    }
  };
  const onAttachment = (event) => {
    setAttachment("");
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={sweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        <label for="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onChangeFile}
          style={{
            opacity: 0,
          }}
        ></input>
        {attachment && (
          <div className="factoryForm__attachment">
            <img
              src={attachment}
              style={{
                backgroundImage: attachment,
              }}
            />
            <div className="factoryForm__clear" onClick={onAttachment}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
      <div style={{ marginTop: 30 }}>
        {sweets.map((sweet) => (
          <Sweet
            sweetObj={sweet}
            key={sweet.id}
            check={sweet.createdId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
