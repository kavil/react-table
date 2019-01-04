import { Button } from 'antd';
import * as React from 'react';
import './App.scss';


class App extends React.Component {
  public render() {
    return (
      <div className="App" style={{padding: '100px'}}>
        <Button type="primary" href="/#/table">standtable</Button>
      </div>
    );
  }
}

export default App;
