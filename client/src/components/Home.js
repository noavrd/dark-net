import axios from 'axios';
import { useEffect, useState } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import SinglePaste from './SinglePaste';

const BASE_URL = 'http://localhost:8080/api';

let cancelToken;
export default function Home() {
  const [allPastes, setAllPastes] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState('');
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

  useEffect(() => {
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('new request');
    }

    cancelToken = axios.CancelToken.source();

    axios
      .get(`${BASE_URL}/pastes?searchText=${searchInput}`, {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        setAllPastes(res.data);
        setError('');
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message !== 'new request') {
          if (err.response.status === 404) {
            setError('No headline found');
            console.log(2);
          } else {
            setError('Server problem please try again');
          }
        }
      });
  }, [searchInput]);
  return (
    <div>
      {showSpinner ? (
        <div>
          <PuffLoader
            color="#f0689b"
            loading={true}
            size={150}
            speedMultiplier={0.88}
          />
          {error ? <div>{error}</div> : ''}
        </div>
      ) : (
        <div>
          <input
            className="search"
            value={searchInput}
            placeholder="Search Paste..."
            onChange={(event) => setSearchInput(event.target.value)}></input>

          {error ? <div>{error}</div> : ''}
          {allPastes
            .sort((a, b) => {
              return new Date(b.creationDate) - new Date(a.creationDate);
            })
            .map((singlePaste, i) => {
              return <SinglePaste singlePaste={singlePaste} key={i} />;
            })}
        </div>
      )}
    </div>
  );
}
