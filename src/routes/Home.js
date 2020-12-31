import React, { useEffect, useState } from "react";
import Sweet from "../components/Sweet";
import { dbService } from "../fbase";

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]);

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
    await dbService.collection("sweet").add({
      text: sweet,
      createdAt: Date.now(),
      createdId: userObj.uid,
    });
    setSweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweet(value);
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
        <input type="submit" value="Sweet"></input>
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
