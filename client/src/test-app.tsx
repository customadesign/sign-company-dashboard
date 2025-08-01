export default function TestApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Sign Company Dashboard - Test Mode</h1>
      <p>React is working!</p>
      <p>API URL: {import.meta.env.VITE_API_URL || 'Not set'}</p>
      <p>Environment: {import.meta.env.MODE}</p>
      <button 
        onClick={() => alert('Button clicked!')}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Test Button
      </button>
    </div>
  );
}