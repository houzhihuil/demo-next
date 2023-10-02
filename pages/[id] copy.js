// pages/[id].js 
import Link from 'next/link';
import Layout from '../components/layout'; 
import { useRouter } from 'next/router';
import axios from 'axios';



export default function ClientPage() {
  const router = useRouter();
  const { id } = router.query; // Access the value of 'id' from the query object
  // retrive data with { id } : `https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData/${id}
  return (
    <Layout> 
    <div>
      <h1>Client ID: {id}</h1> 
    </div>
      <Link href='/'>Home</Link> 
    </Layout>
  );
}

 
  
 