import React, { useCallback, useState } from "react";
import ClockDigital from "./component/ClockDigital";
import GestureWrapper from "./component/GestureWrapper";
import OledSaver from "./component/OledSaver";
import OffcanvasWrapper from "./component/OffcanvasWrapper";
import NoSleep from 'nosleep.js';

const wakelock = new NoSleep();

export default function App() {
  const [hasClicked, setHasClicked] = useState(false);
  const [variant, setVariant] = useState('alexa');
  const handleStarterClick = useCallback(() => {
    setHasClicked(true);
    wakelock.enable();
  }, [setHasClicked]);

  return (
    <div className="app">
      <GestureWrapper render={props => (
        <OffcanvasWrapper {...props} menu={(
          <select onChange={e => setVariant(e.target.value)} value={variant} style={{ width: '100%', fontSize: 22 }}>
            <option value='alexa'>Alexa</option>
            <option value='super-digital'>Super Digital</option>
            <option value='digital'>Digital</option>
            <option value='modernist'>Modernist</option>
          </select>
        )}>
          <OledSaver>
            <ClockDigital variant={variant} fontSize={props.fontSize} opacity={props.opacity} />
          </OledSaver>
        </OffcanvasWrapper>
      )}/>
      {!hasClicked ?
        <div className='app__starter' onClick={() => handleStarterClick()}>
          Press to play
        </div>
        : null
      }
    </div>
  );
}
