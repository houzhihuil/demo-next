import Layout from '../components/layout';
import Link from 'next/link';  

export default function Home() {
  return ( 
      <Layout home> 
        <Link href='/read'>Clients </Link>  
      </Layout>
  )
}
