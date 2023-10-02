import Layout from '../components/layout';
import axios from 'axios';
import Link from 'next/link'; 
import { Button, Checkbox, Form } from 'semantic-ui-react';

export default function ClientPage({ clientData }) {
  const { id, firstName, lastName, checkbox } = clientData;
  
  const updateAPIData = () => { 
    axios
      .put(`https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData/${id}`, {
        firstName,
        lastName,
        checkbox
      })
      .then(() => {
        // Navigate to the root page
        navigate('/');
      })
      
  };
  return (
    <Layout>
      <div>
        <h1>Client ID: {id}</h1>
        {/* <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Checked: {checkbox ? 'Checked' : 'Unchecked'}</p> */}
      </div>
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="I agree to the Terms and Conditions"
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
        </Form.Field>

        <Button onClick={updateAPIData}>Update</Button>
        <Link href='/'> <Button>Cancel</Button> </Link> 
      </Form>
      <Link href='/read'>← Back to Clients </Link>  
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(`https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData/${params.id}`);
    const clientData = response.data;

    return {
      props: {
        clientData,
      },
    };
  } catch (error) {
    console.error('Error fetching client data:', error);

    return {
      props: {
        clientData: {},
      },
    };
  }
}
 

 
  
 