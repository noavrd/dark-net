import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div>
      Page is not exists
      <br />
      <Link to={{ pathname: '/' }}>
        <i className="fa fa-home fa-2x"></i>
      </Link>
    </div>
  );
}
