import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './logo.svg';

const Snow = ({x, y}) => {
  const styles = { position: 'absolute', left: x, top: y, fontSize: '100px', color: '#8888dd' };

/*  return (
   <div style={styles}>*</div>
  );
  */
 return (
  <div style={styles}><Logo /></div>
  );
};

const updateSnows = (setSnows) => {
  //console.log('update Snow');
  setSnows(snows => snows.map(snow => {
    const newPos = {
      x: snow.x + Math.random() * 5 - 2.5,
      y: snow.y + 1,
    }

    if (newPos.y < window.innerHeight ) {
      return newPos;
    }
    return null;
  }).filter(x => x !== null));
}

const createSnow = (setSnows) => {
  //console.log('create Snow');
  if(Math.random() > 0.9) {
    setSnows(snows => [...snows, { x: Math.random() * window.innerWidth, y: -10}]);
  }
}

const SnowFrame = () => {
  const [snows, setSnows] = React.useState([]);

  React.useEffect(() => {
    console.log('effect[]');
    const timers = [
      setInterval(() => {
        updateSnows(setSnows);
        createSnow(setSnows)
      }, 100),
    ];

//    return (() => {
       //timers.forEach(timer => clearInterval(timer));
  }, []);

  React.useEffect(() => {
    //console.log(snows.length);
  }, [snows.length]);



  return (
    <div>
      {snows.map(snow => <Snow {...snow} />)}
     </div>
  );
}

window.addEventListener('load', () => {
  const elm = document.querySelector('#mount');
  ReactDOM.render(<SnowFrame />, elm);
})
