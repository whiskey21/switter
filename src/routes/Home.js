import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";

const Home = () => {
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]);

  const getSweets = async () => {
    const data = await dbService.collection("sweet").get();
    data.forEach((document) => {
      const documentObj = {
        ...document.data(),
        id: document.id,
      };
      setSweets((prev) => [documentObj, ...prev]);
    });
  };

  useEffect(() => {
    getSweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("sweet").add({
      sweet,
      createdAt: Date.now(),
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
        {sweets.map((sweet) => {
          return <div key={sweet.id}>{sweet.sweet}</div>;
        })}
      </div>
    </div>
  );
};
export default Home;
