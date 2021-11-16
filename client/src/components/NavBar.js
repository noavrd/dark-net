import { useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

let cancelToken;
export default function NavBar({
  setAllPastes,
  searchInput,
  setSearchInput,
  setError,
}) {
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
            setAllPastes([]);
            console.log(2);
          } else {
            setError('Server problem please try again');
          }
        }
      });
  }, [searchInput]);
  return (
    <div className="nav">
      <span className="headline">Tor Paste</span>

      <input
        className="search-nav"
        value={searchInput}
        placeholder="Search Paste..."
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <i className="fa fa-search search-nav" id="search-symbol"></i>
    </div>
  );
}
