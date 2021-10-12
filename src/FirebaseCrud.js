/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, Form, Grid, Header, Input, Segment, Table, TableHeaderCell, Icon } from "semantic-ui-react";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  deleteDoc,
} from 'firebase/firestore';

const FirebaseCrud = () => {

  const db = getFirestore();

  const [aFirstName, setAFirstName] = useState('');
  const [aLastName, setALastName] = useState('');
  const [userData, setUserData] = useState([]);
  const [uFirstName, setuFirstName] = useState('');
  const [uLastName, setuLastName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'UserInfo'), (snapshot) => {
      console.count('onSnapshot running...');
      let userInfo = [];
      //console.log(snapshot.docs.map((doc) => doc.data()));
      //this is how you can access data from each doc
      snapshot.forEach((doc) => {
        userInfo.push({...doc.data(), id: doc.id});
      })
      setUserData(userInfo);
    });
    // everytime component unmounts, listener is terminated
    // this prevents constant recalls that use up all your data usage, not like ive ever made that mistake... ;)
    return unsub;

  }, []);

  async function handleAddUser() {
    try {
      await addDoc(collection(getFirestore(), 'UserInfo'), {
        FirstName: aFirstName,
        LastName: aLastName,
        timestamp: serverTimestamp()
      });
    }
    catch(error) {
      console.error('Error writing user info to Firebase Database', error);
    }

    setAFirstName('');
    setALastName('');
  }

  async function handleUpdateUser(fname, lname) {  
    const userInfoRef = doc(db, 'UserInfo', userId);
    //console.log(userId);
    await updateDoc(userInfoRef, {
      FirstName: fname,
      LastName: lname,
      })
  } 

  const handleUpdateClick = (data) => {
    setuFirstName(data.FirstName);
    setuLastName(data.LastName);
    setUserId(data.id);
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, "UserInfo", id));
  }

  return (
    <div className='ui hidden divider'>
      <Container>
        <Grid>
          <Grid.Row columns='2'>
            <Grid.Column>
              <Segment padded='very'>
                <Form>
                  <Form.Field>
                    <label>First Name</label>
                    <Input 
                      placeholder='FirstName' 
                      focus 
                      value={aFirstName} 
                      onChange={(e)=>{setAFirstName(e.target.value)}} 
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Last Name</label>
                    <Input 
                      placeholder='LastName' 
                      focus 
                      value={aLastName} 
                      onChange={(e)=>{setALastName(e.target.value)}} 
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button 
                      onClick={()=>{handleAddUser()}}
                      positive
                    >
                      <Icon name ='add circle'></Icon>
                      Add User
                    </Button>
                  </Form.Field>
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment padded='very'>
                  <Form>
                    <Form.Field>
                      <label>First Name</label>
                      <Input 
                        id='fnameInput'
                        placeholder='FirstName' 
                        focus 
                        value={uFirstName} 
                        onChange={(e)=>{setuFirstName(e.target.value)}} 
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Last Name</label>
                      <Input 
                        id='lnameInput'
                        placeholder='LastName' 
                        focus 
                        value={uLastName} 
                        onChange={(e)=>{setuLastName(e.target.value)}} 
                      />
                    </Form.Field>
                    <Form.Field>
                      <Button 
                        onClick={()=>{handleUpdateUser(uFirstName, uLastName)}}
                        primary 
                      >
                        <Icon name='edit'>
                        </Icon>
                        Update User
                      </Button>
                    </Form.Field>
                  </Form>
                </Segment>
              </Grid.Column>
          </Grid.Row>
          <Grid.Row columns ='1'>
            <Grid.Column>
              {userData.length === 0 ? (
                <Segment padded='very'>
                  <Header textAlign='center'>
                    Oops! There is no data available. Please enter some data.
                  </Header>
                </Segment>
              ) : (
                <Segment padded='very'>
                  <Table celled fixed singleLine>
                    <Table.Header>
                      <Table.Row>
                        <TableHeaderCell>FirstName</TableHeaderCell>
                        <TableHeaderCell>LastName</TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                      </Table.Row>
                    </Table.Header>
                    {
                      userData.map((data, index) => {
                        return (
                          <Table.Body key={index}>
                            <Table.Row>
                              <Table.Cell>{data.FirstName}</Table.Cell>
                              <Table.Cell>{data.LastName}</Table.Cell>
                              <Table.Cell>
                                <Button primary onClick={()=>{handleUpdateClick(data)}}>
                                  <Icon name='edit'></Icon>
                                  Update
                                </Button>
                                <Button color='red' onClick={()=>{handleDelete(data.id)}}>
                                  <Icon name='delete'></Icon>
                                  Delete
                                </Button>
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        );
                      })
                    }
                  </Table>
              </Segment>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  )
}
export default FirebaseCrud;
