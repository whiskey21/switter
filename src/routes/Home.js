import React, { useState } from "react";

const Home = () => {
  const [sweet, setSweet] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
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
    </div>
  );
};
export default Home;
