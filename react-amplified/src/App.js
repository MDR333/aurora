//imports
import React, { useEffect, useState } from 'react'
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { withAuthenticator, Button, Heading, Text, TextField, View } from '@aws-amplify/ui-react';import '@aws-amplify/ui-react/styles.css';
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

// standards
const initialState = { name: '', description: '' }



// app
const App = ({ signOut, user }) => {
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])
  const [file, setFile] = useState(null);
  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    fetchTodos()
  }, [])

  
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  // using GraphQL to fetch current notes on account
  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  // user upload pdf function
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      await Storage.put(file.name, file, {
        contentType: "application/pdf",
        progressCallback(progress) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  
  <input type="file" onChange={onChange} />;

  return (
  <View style={styles.container}>
        <Heading level={1}>Hello {user.username}</Heading>

        <Button style={styles.button}onClick={signOut}>Sign out</Button>

        <Heading level={2}>PDF-GPT</Heading>
  


       {/* upload here */}
      
          <input type="file" onChange={handleFileInput} style={{ display: 'none' }} />
          <Button style={styles.button} onClick={() => document.querySelector("input[type='file']").click()}>
            {file ? file.name : "Upload"}
          </Button>
        


      {
        todos.map((todo, index) => (
          <View key={todo.id ? todo.id : index} style={styles.todo}>
            <Text style={styles.todoName}>{todo.name}</Text>
            <Text style={styles.todoDescription}>{todo.description}</Text>
          </View>
        ))
      }
    </View>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' },
  fileInput: {
    backgroundColor: 'black',
    color: 'white',
    padding: '12px 0',
    fontSize: 18,
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    outline: 'none'
  }
  
}
  



export default withAuthenticator(App);