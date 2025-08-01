import { useParams } from 'react-router-dom';

const OwnerProfile = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Owner Profile</h2>
        <p className="text-gray-600">Profile for owner ID: {id} coming soon...</p>
      </div>
    </div>
  );
};

export default OwnerProfile;