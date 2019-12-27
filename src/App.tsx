import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import './App.css';
import getPets from './services/api';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function loadPets() {
      const data = await getPets()
      console.log(data)
      const array = ['one', 'two', 'three']
      setData(array);
    }
    loadPets();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {data.map(item => <p key={item}>{item}</p>)}
        <Button type="primary">Button</Button>
      </header>
    </div>
  );
}

export default App;
