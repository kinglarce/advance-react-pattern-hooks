import React from 'react';
import Expandable from './components/Expandable'

const doSomethingPersonal = () => {
  console.log('somethins expanded');
}

function App() {
  return (
    <div className="App">
      <Expandable onExpand={doSomethingPersonal}>
        <Expandable.Header>React hooks</Expandable.Header>
        <Expandable.Icon />
        <Expandable.Body>Hooks are awesome</Expandable.Body>
      </Expandable> 
    </div>
  );
}

export default App;
