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
  flex: '1 0 auto',
  overflowY: 'auto',
  padding: '20px',
};