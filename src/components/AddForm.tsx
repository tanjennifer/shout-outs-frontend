import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import "./AddForm.css";
import Shoutout from "../models/Shoutout";
import AuthContext from "../context/AuthContext";
import { storage } from "../firebaseApp";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; // ref is a fn that takes a storage ^ and string

interface Props {
  onAdd: (shoutout: Shoutout) => void;
  name: string | undefined;
}

const AddForm = ({ onAdd, name }: Props) => {
  const { user } = useContext(AuthContext);

  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");

  //
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  //

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    // console.log(to, from, text);

    //build a new shotout
    const newShoutout: Shoutout = { to: to || "", from, text };
    if (user && user.photoURL) {
      newShoutout.photoURL = user.photoURL;
    }

    // file ref upload
    const files = fileInputRef.current?.files;
    console.log(files);
    if (files && files[0]) {
      const newFile = files[0];
      const storageRef = ref(storage, "shoutout-files/" + newFile.name);
      try {
        //sending the photo to our storage bucket - like a db
        const snapshot = await uploadBytes(storageRef, newFile);
        //get that photo ref from the storage bucket
        const downloadURL = await getDownloadURL(snapshot.ref);
        // console.log(downloadURL);
        //add img from firebase to ur own data
        newShoutout.shoutoutImg = downloadURL;
        save(newShoutout);
      } catch (error) {
        console.log("fail"), error;
      }
    } else {
      save(newShoutout);
    }
  };

  function save(newShoutout: Shoutout): void {
    onAdd(newShoutout);

    // onAdd({ to: to || "", from, text });
    setTo("");
    setFrom(user?.displayName || "");
    setText("");
    // formRef.current?.reset();
  }

  useEffect(() => {
    if (name) {
      setTo(name);
    } else {
      setTo("");
    }
  }, [name]);

  useEffect(() => {
    if (user) {
      setFrom(user?.displayName || "");
    } else {
      setFrom("");
    }
  }, [user]);

  return (
    <form className="AddForm" onSubmit={submitHandler} ref={formRef}>
      <h2>Leave a shoutout:</h2>

      <div className="form-input-container">
        <label htmlFor="to">To: </label>
        <input
          className="to-container"
          type="text"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          disabled={name !== undefined}
        />
      </div>

      <div className="form-input-container">
        <label htmlFor="from">From:</label>
        <input
          className="from-container"
          type="text"
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          disabled={user !== null}
        />
      </div>

      <label htmlFor="file">upload image</label>
      <input type="file" name="file" id="file" ref={fileInputRef} />

      <label htmlFor="shoutout">Shout out:</label>
      {/* space to write */}
      <textarea
        className="shoutout-container"
        id="shoutout"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something nice"
      />

      <button className="btn-container" type="submit">
        Submit Now!
      </button>
    </form>
  );
};

export default AddForm;

// const submitHandler = (e: FormEvent) => {
//   e.preventDefault();
//   // console.log(to, from, text);
//   const files = fileInputRef.current?.files;
//   console.log(files);
//   if (files && files[0]) {
//     const newFile = files[0];
//   }

//   const newShoutout: Shoutout = { to: to || "", from, text };
//   if (user && user.photoURL) {
//     newShoutout.photoURL = user.photoURL;
//   }
//   onAdd(newShoutout);

//   // onAdd({ to: to || "", from, text });
//   setTo("");
//   setFrom(user?.displayName || "");
//   setText("");
//   formRef.current?.reset();

//   // const newData: Shoutout = {
//   //   to: to,
//   //   from: from,
//   //   text: text,
//   // };
//   // onAdd(newData);

//   // setTo("");
//   // setFrom("");
//   // setText("");
// };
