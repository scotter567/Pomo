import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

function Timer({render, name}){
  const [time, setTime] = useState('')
  if(!render) return null
  function makeTime(bigTime){
    let end = bigTime %100
    if (end < 10) end="0"+end
    let start = Math.floor(bigTime/100)
    let str = ''
    if (start > 0 ){
      str = start+":"+ end
    }
    else{
      str = ":"+end
    }
    return str
  }
  function startTimer(i){
    let bigTime = parseInt(i.value) * 100
    setInterval(()=>{
      if (bigTime%100 == 0){
        bigTime = bigTime - 40
      }
      bigTime -= 1
      i.value = makeTime(bigTime)
    }, 250)
  }
  function toggleStart(){
    if (document.querySelector('input').value){
      let start = document.querySelector('.start')
      if (document.querySelector('.start').innerText==='Start'){
        start.innerText='Pause'
        start.style.backgroundColor='rgba(255,0,0,.5)'
        let i = document.querySelector('input')
        i.style.pointerEvents = 'none'
        startTimer(i)
      } 
      else{
        start.innerText='Start'
        start.style.backgroundColor='transparent'
      }
    }
    
  }

  return (
  	<> 
      <Stack gap={3} className='col-4 mx-auto flex-column align-items-center'>
        <h1>{name}'s Timer</h1>
        <div style={{fontSize:"xx-large"}} id='timers'>
          <input className='round' placeholder='0' style={{backgroundColor: 'transparent', textAlign: 'center', caretColor: 'transparent', borderColor: 'transparent'}}></input>
        </div>
        <Button className='border start' onClick={toggleStart} style={{backgroundColor:'transparent', color: 'black', }}>
          Start
        </Button>
        <Button className='border'>
          Stop
        </Button>
      </Stack>
    </>
  );
}

export default Timer;