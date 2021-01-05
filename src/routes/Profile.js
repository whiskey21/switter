import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Sweet from "../components/Sweet";
import { authService, dbService } from "../fbase";

const Profile = ({ refreshUser, userObj }) => {
  const [sweets, setSweets] = useState([]);
  const [EditProfile, setEditProfile] = useState(false);
  const [newDisplayName, setDisplayName] = useState(userObj.displayName);
  const history = useHistory();
  const onLogoutClick = (event) => {
    authService.signOut();
    history.push("/"); //if user sign out finds '/' from history stack
  };

  /* const getMySweets = () => {
    dbService.collection("sweet").onSnapshot((snap) => {
      const dbArray = snap.docs.map((document) => ({
        id: document.id, //its not same with createdID
        ...document.data(),
      }));
      setSweets(dbArray);
      /* const data = await dbService
      .collection("sweet")
      .where("createdId", "==", userObj.uid)
      .get(); //should put string in first prop
    console.log(data.docs.map((doc) => doc.data()));
    const dbArray = data.docs.map((doc) => doc.data());
    setSweets(dbArray);
    console.log(sweets); */

  const onChangeName = (event) => {
    const {
      target: { value },
    } = event;
    setDisplayName(value);
  };

  const onDisplaySubmit = async (event) => {
    event.preventDefault();
    if (newDisplayName !== userObj.displayName) {
      await userObj
        .updateProfile({ displayName: newDisplayName })
        .then(() => window.alert("Profile update Successfully!"));
      setEditProfile(false);
      refreshUser();
    }
  };

  const onClickProfile = () => {
    setEditProfile((prev) => !prev);
  };

  useEffect(() => {
    //getMySweets();
    console.log("profileEffect");
  }, []);

  return (
    <div className="container">
      {/* <button onClick={onClickProfile}>Edit Profile</button>
      {EditProfile && ( */}
      <form onSubmit={onDisplaySubmit} className="profileForm">
        <input
          type="text"
          placeholder="Change Display Name"
          value={newDisplayName}
          autoFocus
          onChange={onChangeName}
          className="formInput"
        ></input>
        <input
          type="submit"
          value="Update Name"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
        Log Out
      </span>
      {/* <div>
        {sweets.map((sweet) => (
          <Sweet
            sweetObj={sweet}
            key={sweet.id}
            check={sweet.createdId === userObj.uid}
          />
        ))}
      </div> */}
    </div>
  );
};
export default Profile;
