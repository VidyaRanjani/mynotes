import React, { useState, useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import fire from './fire';
import { SentimentVerySatisfiedTwoTone } from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



function App() {


 useEffect (() => {
   readNoteFromDatabase()
 },[]);

  const [Subject, setSubject] = useState('');
  const [Topic, setTopic] = useState('');
  const [NoteInput, setNoteInput] = useState('');
  const [myNote, setmyNote] = useState([]);

  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
    };
   const handleChangeTopic = (event) => {
    setTopic(event.target.value);
  };
const handleChangeNoteInput = (event) => {
    setNoteInput(event.target.value);
  };

  const onCreat = () => {

    fire.database().ref("/note").push({
      subject : Subject,
      topic : Topic,
      noteInput : NoteInput
    });
    
  };

  const removeData = () => {
    fire.database().ref("/note").remove({
      subject :Subject,
      topic : Topic,
      noteInput : NoteInput
    });
  };

  const readNoteFromDatabase = () => {
    fire.database().ref("/note").on("value",(snapshot) => {
      const myNoteList = [];
      const noteInDatabase = snapshot.val()
      for(let key in noteInDatabase){
        myNoteList.push(noteInDatabase[key])
      }
      setmyNote(myNoteList);
    });
  };
  
  return (
  <div style ={{flex:1,padding :20 ,margin :20}}>
  

    <div style ={{flex: 1/4,padding :20 ,margin :20,border : "1px solid rgba(0,0,0,0.5)",backgroundColor : "rgba(50, 107, 168,0.5)"}}>

      <TextField
          id="Subject"
          label="Subject"
          multiline
          maxRows={4}
          value={Subject}
          onChange={handleChangeSubject}
          variant="outlined"
          style = {{margin :20,backgroundColor:"white"}}
        />
    
        <TextField
          id="Topic"
          label="Topic"
          multiline
          maxRows={4}
          value={Topic}
          onChange={handleChangeTopic}
          variant="outlined"
          style = {{margin :20,backgroundColor:"white"}}
        />
       
      <TextField
          id="Notes"
          label="Start writing here"
          multiline
          maxRows={20}
          value={NoteInput}
          onChange={handleChangeNoteInput}
          variant="outlined"
          style = {{margin :20,backgroundColor:"white"}}
        />
        

        <Button variant="contained" color="primary" disableElevation  style = {{margin :30}} onClick = {onCreat}>Create</Button>

        </div>

        <div  style ={{flex: 3/4,border : "1px solid rgba(0,0,0,0.5)",width :1400,height :900}}>
          <h1 style = {{backgroundColor : "rgba(50, 107, 168,0.5)",height :100 ,fontSize :30}}>MyNotes</h1>

          <div>
            {
              myNote.map((info,i) => {
                return(
                  <div>
                  <p key = {i}>{info.subject}-----{info.topic}
                  <br></br>
                  <br></br>
                  <hr></hr>
                  {info.noteInput}
                  </p>

                  <Button onClick = {removeData}>Delet</Button>
                
                  </div>
                  )
              })
            }
          </div>
         
        </div>
       
     

    </div>
  );
}

export default App;
