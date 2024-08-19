import './App.css';
import Form from './Functional Comps/Form';

function App() {
  return (
    <div className="App" >
      <header style={headerStyle}>Tolstoy Task</header>
      <main style={mainContentStyle}>
      <Form />
      </main>
    </div>
  );
}

export default App;

const appStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center horizontally
  justifyContent: 'center', // Center vertically
  height: '100vh', // Full viewport height
  backgroundColor: '#f0f2f5', // Background color for the whole app
  padding: '20px', // Padding around the main container
  boxSizing: 'border-box', // Include padding in the total width/height
};

const headerStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '20px',
  fontSize: '24px',
  fontWeight: 'bold',
  borderBottom: '4px solid #0056b3',
  textAlign: 'center',
  width: '100%', // Ensure header spans full width
};

const mainContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', // Center content vertically
  width: '100%',
  maxWidth: '800px',
  flex: '1 0 auto',
  overflowY: 'auto',
  padding: '20px',
};