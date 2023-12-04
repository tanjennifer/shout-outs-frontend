//we ahve an interface to the backend but you still need one for the front end
//need to make it where youre receiving the data
//fyi also in backend

export default interface Shoutout {
  _id?: string; //not communicating with mongo so this should be string not objectid
  to: string;
  from: string;
  text: string;
  photoURL?: string; //add to backend; profile img of the sender
  shoutoutImg?: string; // file upload -- alien ex; added to backend
}
