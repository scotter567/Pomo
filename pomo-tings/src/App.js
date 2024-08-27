import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import React, { useState } from 'react';
import Timer from './Timer'
import Tasks from './Tasks'
import AddTask from './AddTask'
import './css/shake.css'


function App() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [side, setSide] = useState(true)
  const [locked, setLocked] = useState(true) 

  let content=['Jordan', 'Pal']
  function click(e){
    let id=e.target.id
    if(id === 'users-tab-jordan'){
      setText1(content[0])
      setText2('')
      setSide(true)
      document.body.classList.add('right')
      document.body.classList.remove('left')
      document.getElementById('users-tab-jordan').style.backgroundColor = 'gray'
      document.getElementById('users-tab-pal').style.backgroundColor = ''
    } 
    else{
      setText2(content[1])
      setText1('')
      setSide(false)
      document.body.classList.remove('right')
      document.body.classList.add('left')
      document.getElementById('users-tab-jordan').style.backgroundColor = ''
      document.getElementById('users-tab-pal').style.backgroundColor = 'gray'
    } 
  }

  function unlockAndLoad(){
    document.getElementById('check').style.display="none"
    setText1(content[0])
    document.body.classList.add('right')
    document.body.classList.remove('left')
    document.getElementById('users-tab-jordan').style.backgroundColor = 'gray'
    document.getElementById('users-tab-pal').style.backgroundColor = ''
    document.getElementById('check').remove()
  }

  function checkPW(){
    document.getElementById('check').classList.remove('shake')
    if(document.getElementById('pwControl').value === process.env.REACT_APP_PW){
      setLocked(false)
      unlockAndLoad()
    }
    else{
      setTimeout(() => {
        document.getElementById('wrong').style.visibility = ''
        document.getElementById('check').classList.add('shake')
      }, 100) 
    } 
  }

  function pressedKey(e){
    if(e.key === "Enter"){
      checkPW()
    }
  }

  return (
    
    <>
     <div
      className="modal show"
      style={{ display: 'block'}}
      id='check'
      >
        <Modal.Dialog backdrop="static">
          <Modal.Header>
            <Modal.Title>Password Chec</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Control autoFocus onKeyDown={pressedKey} id='pwControl' placeholder="Password"/>
            <Form.Label id='wrong' style={{visibility:'hidden', color:'red'}}>This is incorrect</Form.Label>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={checkPW} variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
      <Tabs
        defaultActiveKey="jordan"
        id='users'
        className="mb-3"
        onClick= {click}
        justify
      >
        <Tab className="flex-column align-items-center" eventKey="jordan" title="Jordan" style={{display:'flex'}}>
          <Timer className='timer' render={side} name={"Jordan"}/>
          <Tasks render={side} name={"Jordan"}/>
          <AddTask render={side} name={"Jordan"}/>
        </Tab>
        <Tab className="flex-column align-items-center" eventKey="pal" title="Pal" style={{display:'flex'}}>
          <Timer className='timer' render={!side} name={"Pal"}/>
          <Tasks render={!side} name={"Pal"}/>
          <AddTask render={!side} name={"Pal"}/>
        </Tab>
      </Tabs>
    </>    
  );
}

export default App;
