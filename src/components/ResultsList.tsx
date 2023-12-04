import { Link } from "react-router-dom";
import Shoutout from "../models/Shoutout";
import "./ResultsList.css";

interface Props {
  shoutout: Shoutout;
  // to: string | undefined;
  onDelete: (id: string) => void;
}

const ResultsList = ({ shoutout, onDelete }: Props) => {
  const deleteItemHandler = () => {
    // Call the onDelete function with the shoutout's id
    onDelete(shoutout._id || ""); // Use a default empty string if _id is undefined
  };

  return (
    <li className="ResultsList">
      {shoutout.shoutoutImg && (
        <img src={shoutout.shoutoutImg} alt="shoutout" />
      )}
      <p>
        Shout out to: <Link to={`/user/${shoutout.to}`}>{shoutout.to}</Link>{" "}
      </p>
      <p>
        -From{" "}
        {shoutout.photoURL && (
          //coming from mongo shoutout
          <img src={shoutout.photoURL} alt={shoutout.from} />
        )}
        <Link to={`/user/${shoutout.from}`}>{shoutout.from}</Link>
      </p>
      <p>"{shoutout.text}"</p>
      <button className="delete-btn" onClick={deleteItemHandler}>
        delete
      </button>
    </li>
  );
};

export default ResultsList;
