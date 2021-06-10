import { useState } from 'react';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
export default function Spinner(loading) {
  //   let [loading, setLoading] = useState(true);
  let [color, setColor] = useState('#a0b1e6');
  return (
    <div>
      {console.log(1)}
      <div className="spinner">
        <ClimbingBoxLoader color={color} loading={loading} size={150} />
      </div>
    </div>
  );
}
