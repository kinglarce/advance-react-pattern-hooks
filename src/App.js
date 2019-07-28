import React, { useState } from 'react';
import Expandable from './components/Expandable'
import useExpanded from './useExpanded.js'
import useEffectAfterMount from './useEffectAfterMount.js'
import Header from './components/Header'
import Icon from './components/Icon'
import Body from './components/Body'

import { longText as TermsAndConditionText } from './components/utils'

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
  const { expanded, toggle, reset, resetDep } = useExpanded(false)
  console.log('the rendering : ', resetDep);
  useEffectAfterMount(
    () => {
      console.log('reset cleanup in progress!!!!')
    }, 
    [resetDep]
  )

  return (
    <section className='App'>
      <div className='Expandable'>
        <Header toggle={toggle}> Terms and Conditions </Header>
        <Icon expanded={expanded} />
        <Body expanded={expanded}>
          {TermsAndConditionText}
          <button onClick={reset}>reset</button>
        </Body>
      </div>
    </section>
  )
}


export default App;
