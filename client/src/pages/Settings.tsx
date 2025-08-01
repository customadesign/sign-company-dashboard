import UserSettings from '../components/profile/UserSettings';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Settings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account preferences, notifications, and security settings.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <UserSettings />
      </div>
    </div>
  );
};

export default Settings;