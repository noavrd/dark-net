import axios from 'axios';
import { useEffect, useState } from 'react';
import SinglePaste from './SinglePaste';
export default function Home() {
  const [allPastes, setAllPastes] = useState([]);
  const [postFinished, setPostFinished] = useState(false);
  useEffect(() => {
    axios
      .post('api/addPaste')
      .then((result) => setPostFinished(true))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get('api/pastes')
      .then((result) => {
        setAllPastes(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postFinished]);
  console.log(allPastes);
  return (
    <div>
      {allPastes.map((singlePaste, i) => {
        return <SinglePaste singlePaste={singlePaste} key={i} />;
      })}
    </div>
  );
}
