import { useContext, useEffect, useState } from "react";
import "./ListShoutout.css";
import {
  addShoutout,
  deleteAShoutout,
  getAllShoutouts,
} from "../services/shoutoutService";
import Shoutout from "../models/Shoutout";
import ResultsList from "./ResultsList";
import AddForm from "./AddForm";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ListShoutout = () => {
  const { user } = useContext(AuthContext);
  //store data in state var; start out as an empty array, but a shoutout[]
  //holding shoutout state var, deleting
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const name: string | undefined = useParams().to;
  // console.log(name);

  // const updateSOs

  useEffect(() => {
    // if (!name) {
    getAllShoutouts(name).then((res) => {
      setShoutouts(res);
      console.log(res);
      // });
      // } else {
      //   getAllShoutouts().then((res) => {
      //     const filteredres = res.filter((item) => item.to === name);
      //     setShoutouts(filteredres);
      //     console.log(res);
      //   });
    });
  }, [name]); // dep

  const addHandler = (shoutout: Shoutout) => {
    //update
    addShoutout(shoutout).then(() => {
      //get All from db, then resp
      getAllShoutouts().then((response) => {
        setShoutouts(response);
      });
    });
  };

  const deleteSOHandler = (id: string) => {
    deleteAShoutout(id).then(() => {
      getAllShoutouts().then((response) => {
        setShoutouts(response);
      });
    });
  };

  return (
    <main>
      {user ? (
        <AddForm onAdd={addHandler} name={name} />
      ) : (
        <p>sign in to leave shoutout</p>
      )}

      <ul className="ListShoutout">
        {shoutouts.map((shoutout) => (
          <ResultsList
            key={shoutout._id}
            shoutout={shoutout}
            onDelete={deleteSOHandler}
          />
        ))}
      </ul>
    </main>
  );
};

{
  /* {shoutouts.map((shoutout) => (
        <li key={shoutout._id}>
          <p>Shoutout to: {shoutout.to}</p>
          <p>From: {shoutout.from}</p>
          <p>{shoutout.text}</p>
        </li>
      ))} */
}

export default ListShoutout;
