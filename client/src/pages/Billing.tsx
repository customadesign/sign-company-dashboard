import UserBilling from '../components/profile/UserBilling';

const Billing = () => {
  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Billing & Subscription
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your billing information, subscription plans, and payment methods.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <UserBilling />
      </div>
    </div>
  );
};

export default Billing;