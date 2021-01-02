import React, { useEffect, useState } from "react";
import Sweet from "../components/Sweet";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";

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
    });
  };

  useEffect(() => {
    getSweets();
  }, []);

  const onSubmit = async (event) => {
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
    setAttachment(null);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={sweet}
          onChange={onChange}
          type="text"
          placeholder="Sweet what you think!"
        ></input>
        <input type="file" accept="image/*" onChange={onChangeFile} />
        <input type="submit" value="Sweet"></input>
        {attachment && (
          <div>
            <img alt="123" src={attachment} height="50px" width="50px" />
            <button onClick={onAttachment}>Cancle</button>
          </div>
        )}
      </form>
      <div>
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
