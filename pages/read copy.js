import axios from 'axios';
import { Table } from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../components/layout';

function Read({ data }) {
  // Your component code here
  console.log({ data })
  return (
    <>
    <Layout home> 
    <div>  
        <Link href='/'>Home</Link> 
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
                {data.map((item) => (
                    <Table.Row key={item.id}>

                        <Table.Cell>{item.id}</Table.Cell>
                        <Table.Cell>{item.firstName}</Table.Cell>
                        <Table.Cell>{item.lastName}</Table.Cell>
                        <Table.Cell>{item.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>
                        <Table.Cell>
                {/* Add Link for Update with id as a query parameter */}
                <Link href={`/${item.id}`}>Update</Link>
              </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table> 
    </div>
    </Layout> 
    </>
);
}

export async function getStaticProps() {
  try {
    // Fetch data from the API
    const response = await axios.get('https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData');
    const data = response.data;

    // Return data as props
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    // Return an empty array or handle errors as needed
    return {
      props: {
        data: [],
      },
    };
  }
}

/* export async function getServerSideProps(context) {
  try {
    // Fetch data from the API
    const response = await axios.get('https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData');
    const data = response.data;

    // Return data as props
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    // Return an empty array or handle errors as needed
    return {
      props: {
        data: [],
      },
    };
  }
}
 */
export default Read;
