import axios from 'axios';
import { useEffect, useState } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import SinglePaste from './SinglePaste';

const BASE_URL = 'http://localhost:8080/api';

export default function Home({ allPastes, setAllPastes, error, setError }) {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    axios
      .post(`${BASE_URL}/addPaste`)
      .then((result) => {
        setShowSpinner(true);

        axios
          .get(`${BASE_URL}/pastes`)
          .then((result) => {
            setAllPastes(result.data);
          })
          .catch((err) => {
            setError('Server problem please try again');
            console.log(err);
          });
        setShowSpinner(false);
      })
      .catch((err) => {
        setError('Server problem please try again');
        console.log(err);
      });
  }, []);

  return (
    <div>
      {showSpinner ? (
        <div className="main">
          <PuffLoader
            color="#f0689b"
            loading={true}
            size={150}
            speedMultiplier={0.88}
          />
          {error ? <div>{error}</div> : ''}
        </div>
      ) : (
        <div className="main">
          {error ? <div>{error}</div> : ''}
          {allPastes.map((singlePaste, i) => {
            return <SinglePaste singlePaste={singlePaste} key={i} />;
          })}
        </div>
      )}
    </div>
  );
}
