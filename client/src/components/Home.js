import axios from 'axios';
import { useEffect, useState } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import Pagination from './Pagination';

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
        <div className="main spinner">
          <PuffLoader
            color="#000000"
            loading={true}
            size={150}
            speedMultiplier={0.88}
          />
          {error ? <div className="error">{error}</div> : ''}
        </div>
      ) : (
        <div className="main paste">
          {error ? <div className="error">{error}</div> : ''}
          <Pagination allPastes={allPastes} pageLimit={5} dataLimit={10} />
        </div>
      )}
    </div>
  );
}
