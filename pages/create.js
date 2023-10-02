import { useState } from 'react'; 
import Layout from '../components/layout'; 
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Create() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    checkbox: false,
  });

  const router = useRouter(); // Initialize the useRouter hook

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the API with form data
      const response = await axios.post('https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData', formData);
      
      // Handle the response or navigate to another page
      console.log('Data submitted successfully:', response.data);
      // Redirect to the desired page after successful submission
      // router.push('/success'); // You can use useRouter if needed
      router.push('/read');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <Layout home>
      <div>
        <h1>Create a New Client</h1>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Checked:
            <input
              type="checkbox"
              name="checkbox"
              checked={formData.checkbox}
              onChange={handleChange}
            />
          </label>
          <br />  
          <button type="submit">Submit</button> 
        </form> 
      </div> 
    </Layout>
  );
}
