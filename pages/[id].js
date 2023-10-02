import Layout from '../components/layout';
import axios from 'axios';
import Link from 'next/link'; 

export default function ClientPage({ clientData }) {
  const { id, firstName, lastName, checkbox } = clientData;

  return (
    <Layout>
      <div>
        <h1>Client ID: {id}</h1>
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Checked: {checkbox ? 'Checked' : 'Unchecked'}</p>
      </div>
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
 

 
  
 