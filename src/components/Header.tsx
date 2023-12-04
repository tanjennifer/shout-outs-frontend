import { useContext, useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle, signOut } from "../firebaseApp";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const history = useNavigate();
  // console.log(history);

  // // console.log(window.location.href);
  // const urlPath = window.location.href;
  // const paths = urlPath.split("/");
  // // console.log(paths);
  // const name: string | undefined = paths[paths.length - 1]; //gives last string of arr; with splice -1 rep last (not js)
  // //desc last one, expected to be name /user/NAME
  // console.log(name);

  // useEffect(()=>{}, [])

  const urlPath = window.location.href;
  const paths = urlPath.split("/");
  useEffect(() => {
    if (paths.includes("user")) {
      setName(paths[paths.length - 1]);
    } else {
      setName("");
    }
  }, [history]);

  return (
    <header className="Header">
      <h1>{name ? `Shoutouts for ${name}` : "All Shout Outs"}</h1>
      {/* <Link to={"/user/Mom"}>back</Link> */}
      <Link className="link" to={"/"}>
        Back to all shoutouts
      </Link>
      {/* //line 8 AuthContextProvider */}
      {!user ? (
        <button onClick={signInWithGoogle}>sign in</button>
      ) : (
        <>
          <Link to={"/me"}>ME HEHE</Link>
          <p>Welcome, {user.displayName}</p>
          <img
            src={user.photoURL || "placeholder img goes here"}
            alt={user.displayName || ""}
          />
          <button onClick={signOut}>sign out</button>
        </>
      )}
    </header>
  );
};

export default Header;
