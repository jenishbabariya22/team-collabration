import { useStateContext } from '../../context/StateContext'; 

function DashboardPage() {
  const { state } = useStateContext(); // Access the state
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {state.user ? (
        <p>Welcome, {state.user.email}!</p>
      ) : (
        <p>Please log in to see your tasks.</p>
      )}
      {/* Add additional dashboard content here */}
    </div>
  );
}

export default DashboardPage;
