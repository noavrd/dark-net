import axios from 'axios';
import { useEffect, useState } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import SinglePaste from './SinglePaste';
export default function Home() {
  const [allPastes, setAllPastes] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    axios
      .post('http://localhost:8080/api/addPaste')
      .then((result) => {
        setShowSpinner(true);

        axios
          .get('http://localhost:8080/api/pastes')
          .then((result) => {
            setAllPastes(result.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setShowSpinner(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {showSpinner ? (
        <PuffLoader
          color="#f0689b"
          loading={true}
          size={150}
          speedMultiplier={0.88}
        />
      ) : (
        ''
      )}

      {allPastes.map((singlePaste, i) => {
        return <SinglePaste singlePaste={singlePaste} key={i} />;
      })}
    </div>
  );
}
