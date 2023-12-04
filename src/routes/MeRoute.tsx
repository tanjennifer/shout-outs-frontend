import { useContext, useEffect, useState } from "react";
import ResultsList from "../components/ResultsList";
import "./MeRoute.css";
import Shoutout from "../models/Shoutout";
import { getAllShoutouts } from "../services/shoutoutService";
// import AuthContext, { AuthContextModel } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import ListShoutout from "../components/ListShoutout";
import AuthContext from "../context/AuthContext";

const MeRoute = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getAllShoutouts().then((res) => {
        const filteredRes = res.filter(
          (so) => so.to === user?.displayName || so.from == user?.displayName
        );
        setShoutouts(filteredRes);
      });
    } else {
      //send user back if not logged in
      //   setTimeout(() => {});
      navigate("/");
    }
  }, [user]);

  return (
    <div className="MeRoute">
      <h2>All shoutouts to or from myself:</h2>
      <ul className="ListShoutout">
        {shoutouts.map((shoutout) => (
          <ResultsList
            key={shoutout._id}
            shoutout={shoutout}
            onDelete={() => {}}
          />
        ))}
      </ul>
    </div>
  );
};

export default MeRoute;
