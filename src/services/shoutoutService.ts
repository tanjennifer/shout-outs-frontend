//reminder npm install and npm i axios
//VITE_APP_BASEURL=http://127.0.0.1:5001/shoutouts-b2f72/us-central1/api

import axios from "axios";
import Shoutout from "../models/Shoutout";

//import from env //baseurl using import.meta.env.THEVARIABLENAME
// "" if not hitting api
const baseUrl: string = import.meta.env.VITE_APP_BASEURL ?? "baseurl not found";

//GET - dont need param, need a promise and return array of shoutout obj
export const getAllShoutouts = (to?: string): Promise<Shoutout[]> => {
  return axios
    .get(`${baseUrl}/shoutouts`, {
      params: {
        to: to,
      },
    })
    .then((res) => {
      return res.data;
    });
};

//POST; needs body to do its job... which is a shoutout
export const addShoutout = (shoutout: Shoutout): Promise<Shoutout> => {
  return axios.post(`${baseUrl}/shoutouts`, shoutout).then((res) => {
    return res.data;
  });
};

//DELETE; no body just path param
export const deleteAShoutout = (id: string): Promise<void> => {
  return axios
    .delete(`${baseUrl}/shoutouts/${encodeURIComponent(id)}`)
    .then((res) => {
      return res.data;
    });
};

export const clearAllShoutouts = (): Promise<void> => {
  return axios.delete(`${baseUrl}/shoutouts/`).then((res) => {
    return res.data;
  });
};

// // replace / update Shoutout by ID
// shoutoutRouter.put("/shoutouts/:id", async (req, res) => {
//   try {
//     const _id: ObjectId = new ObjectId(req.params.id);
//     const updatedShoutout: Shoutout = req.body;
//     delete updatedShoutout._id; // remove _id from body so we only have one.
//     const client = await getClient();
//     const result = await client
//       .db()
//       .collection<Shoutout>("shoutouts")
//       .replaceOne({ _id }, updatedShoutout);
//     if (result.modifiedCount) {
//       updatedShoutout._id = _id;
//       res.status(200).json(updatedShoutout);
//     } else {
//       res.status(404).json({ message: "Not Found" });
//     }
//   } catch (err) {
//     errorResponse(err, res);
//   }
// });

//GET -- TOP 5
