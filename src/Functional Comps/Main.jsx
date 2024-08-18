import React from 'react'
import Form from './Form';

export default function Main() {
  return (
    <div>
      <header style={headerStyle}>Tolstoy Task</header>
      <Form/>
    </div>
  )
}

const headerStyle = {
    backgroundColor: '#007bff', /* Blue background color */
    color: 'white', /* White text color */
    padding: '20px', /* Space around the text */
    fontSize: '24px', /* Larger font size */
    fontWeight: 'bold', /* Bold text */
    borderBottom: '4px solid #0056b3', /* Darker blue border at the bottom */
    textAlign: 'center' /* Center-align text */
  };
  