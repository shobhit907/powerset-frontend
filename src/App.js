import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const callAPI = async () => {
    await axios.get('https://powerset-backend.herokuapp.com/testapp/').then(res => {
      setData([...data, res.data]);
    });
    console.log(data);
  };
  return (
    <div>
      <div>
        Data's length : {data.length}
        <ul>
          {data.map((value,index)=>{
              return <li key={index}>{JSON.stringify(value)}</li>
          })}
        </ul>
      </div>
      <button onClick={callAPI}>
        Call Test API!!
      </button>
    </div>
  );
}

export default App;
