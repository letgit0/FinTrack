import { useUser } from '@clerk/clerk-react';
import RecordForm from './RecordForm';
import RecordList from './RecordList';

export const Dashboard = () => {
  const { user } = useUser();

  return (
    <div >
      <h1>Welcome, {user?.firstName}!</h1>
      <RecordForm />
      <RecordList />
    </div>
  )
}