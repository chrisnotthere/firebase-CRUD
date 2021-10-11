import { Button, Container, Form, Grid, Header, Input, Segment, Table, TableHeaderCell } from "semantic-ui-react";
import { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/compact/firestore';

const FirebaseCrud = () => {

  const [aFirstName, setAFirstName] = useState('');
  const [aLastName, setALastName] = useState('');
  const [userData, setUserData] = useState([]);

  //load user data
  useEffect(() => {
    const firestore = firebase.database().ref('/UserInfo');

  },[]);

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
      console.error('Error writing new message to Firebase Database', error);
    }
  }

  // const db = getFirestore(app);
  // const docRef = doc(db, "cities", "SF");
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }



  return (
    <div class='ui hidden divider'>
      <Container>
        <Grid>
          <Grid.Row columns='2'>
            <Grid.Column>
              <Segment>
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
                    >Add User</Button>
                  </Form.Field>
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column>Edit User</Grid.Column>
          </Grid.Row>
          <Grid.Row comlumns ='1'>
            <Grid.Column>
              {userData.length === 0 ? (
                <Segment>
                  <Header>
                    Oops! There is no data available. Please enter some data.
                  </Header>
                </Segment>
              ) : (
                <Segment>
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <TableHeaderCell>FirstName</TableHeaderCell>
                        <TableHeaderCell>LastName</TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                      </Table.Row>
                    </Table.Header>
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
