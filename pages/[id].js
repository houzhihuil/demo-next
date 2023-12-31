import Layout from '../components/layout';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react'; // Import useState
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { useRouter } from 'next/router'; // Import useRouter for navigation

export default function ClientPage({ clientData }) {
  const { id } = clientData;

  // Define state variables for first name, last name, and checkbox
  const [firstName, setFirstName] = useState(clientData.firstName);
  const [lastName, setLastName] = useState(clientData.lastName);
  const [checkbox, setCheckbox] = useState(clientData.checkbox);

  const router = useRouter(); // Get the router for navigation

  const updateAPIData = () => {
    axios
      .put(`https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData/${id}`, {
        firstName,
        lastName,
        checkbox,
      })
      .then(() => {
        // Navigate to the root page
        router.push('/read');
      })
      .catch((error) => {
        console.error('Error updating client data:', error);
      });
  };

  return (
    <Layout>
      <div>
        <h1>Client ID: {id}</h1>
       {/*  <p>First Name: {firstName}</p>
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
        <Link href="/read"> <Button>Cancel</Button> </Link>
      </Form> 
    </Layout>
  );
}

// Rest of your code remains the same
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