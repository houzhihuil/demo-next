import axios from 'axios';
import { useState } from 'react'; // Import useState
import { Table, Button } from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../components/layout';

function Read({ data }) {
  // Initialize the state to hold the data
  const [clientData, setClientData] = useState(data);

  const handleDelete = async (id) => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      try {
        // Send a DELETE request to the API to delete the client
        await axios.delete(`https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData/${id}`);

        // Update the UI to reflect the deletion by filtering out the deleted client
        setClientData(clientData.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  return (
    <Layout home>
      <div>
        <Link href='/create'>Add new client</Link>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Checked</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {clientData.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.firstName}</Table.Cell>
                <Table.Cell>{item.lastName}</Table.Cell>
                <Table.Cell>{item.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>
                <Table.Cell>
                  <Link href={`/${item.id}`}>Update</Link>
                  <Button onClick={() => handleDelete(item.id)} color='red'>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </Layout>
  );
} 

export async function getStaticProps() {
  try {
    const response = await axios.get('https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData');
    const data = response.data;

    return {
      props: {
        data,
      },
      // Revalidate data every 1 hour
      revalidate: 3600, // in seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        data: [],
      },
    };
  }
}
  
export default Read;
