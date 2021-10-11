import { Button, Container, Form, Grid, Header, Input, Segment, Table, TableHeaderCell, Icon } from "semantic-ui-react";
import { useState, useEffect } from "react";
//import firebase from 'firebase/compat/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { tsBooleanKeyword } from "@babel/types";

const FirebaseCrud = () => {

  const db = getFirestore();

  const [aFirstName, setAFirstName] = useState('');
  const [aLastName, setALastName] = useState('');
  const [userData, setUserData] = useState([]);
  const [uFirstName, setuFirstName] = useState('');
  const [uLastName, setuLastName] = useState('');
  const [userId, setUserId] = useState('');

  let userInfo = [];
  
  useEffect(() => {
    async function fetchData(){
      const querySnapshot = await getDocs(collection(db, "UserInfo"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        userInfo.push(doc.data());
      });
      console.log(userInfo);
      setUserData(userInfo);
    }
    fetchData();
  }, [userData])

  // Saves a data to Cloud Firestore.
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
  }

  async function handleUpdateUser(fname, lname) {   // still working on getting this to work correctly
    //const firestore = 

    const userInfoRef = doc(db, 'UserInfo', userId);

    try {
      await updateDoc(userInfoRef, {
        FirstName: fname,
        LastName: lname,
      });
    }
    catch(error) {
      console.error('Error updating user info in Firebase Database', error);
    }

    // db.collection("UserInfo").doc(userId).update({
    //   FirstName: fname,
    //   LastName: lname,
    // }).then(function() {
    //   console.log("document updated");
    // });

  }


  const handleUpdateClick = (data) => {
    setuFirstName(data.FirstName);
    setuLastName(data.LastName);
    setUserId(data.id);
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
                        placeholder='FirstName' 
                        focus 
                        value={uFirstName} 
                        onChange={(e)=>{setuFirstName(e.target.value)}} 
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Last Name</label>
                      <Input 
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
                    {console.log(userData)}
                    {
                      userData.map((data, index) => {
                        return (
                        <Table.Body>
                          <Table.Cell>{data.FirstName}</Table.Cell>
                          <Table.Cell>{data.LastName}</Table.Cell>
                          <Table.Cell>
                            <Button primary onClick={()=>{handleUpdateClick(data)}}>
                              <Icon name='edit'></Icon>
                              Update
                            </Button>
                            <Button color='red'>
                              <Icon name='delete'></Icon>
                              Delete
                            </Button>
                          </Table.Cell>
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
