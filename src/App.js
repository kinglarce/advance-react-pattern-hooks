import React, { useState } from 'react';
import Expandable from './components/Expandable'
import useExpanded from './useExpanded.js'
import useEffectAfterMount from './useEffectAfterMount.js'

const doSomethingPersonal = () => {
  console.log('somethins expanded');
}

const information = [
  {
    header: 'Why everyone should live forrever',
    note: 'This is highly sensitive information ... !!!!'
  },
  {
    header: 'The internet disappears',
    note:
      'I just uncovered the biggest threat...'
  },
  {
    header: 'The truth about Elon musk and Mars!',
    note: 'Nobody tells you this...'
  }
]


// function App() {
//   const [activeIndex, setActiveIndex] = useState(null)
//   const onExpand = evt => setActiveIndex(evt.target.dataset.index)

//   return (
//     <div className="App">
//       {information.map(({ header, note }, index) => (
//         // the "+" converts the `activeIndex` to a number
//         <Expandable key={index} shouldExpand={index === +activeIndex} onExpand={onExpand}>
//           <Expandable.Header data-index={index}>
//             {header}
//           </Expandable.Header>
//           <Expandable.Icon />
//           <Expandable.Body>{note}</Expandable.Body>
//         </Expandable>
//       ))}
//     </div>
//   );
// }

function App () {
  const { expanded, togglerProps } = useExpanded()
  return (
    <div style={{ marginTop: '3rem' }}>
      <button {...togglerProps}>Click to view awesomeness...</button>
      {expanded ? <p>{'😎'.repeat(50)}</p> : null}
    </div>
  )
}


export default App;
