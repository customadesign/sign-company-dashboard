import { useState } from 'react';
import {
  CreditCardIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const UserBilling = () => {
  const [activeSection, setActiveSection] = useState('subscription');

  // Mock data - in a real app, this would come from an API
  const subscriptionData = {
    plan: 'Professional',
    status: 'active',
    price: 29.99,
    billingCycle: 'monthly',
    nextBillDate: '2024-02-15',
    features: [
      'Unlimited Projects',
      'Advanced Analytics',
      'Priority Support',
      'Custom Branding',
      'API Access',
      'Team Collaboration',
    ],
  };

  const paymentMethods = [
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2026,
      isDefault: true,
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '8888',
      expiryMonth: 8,
      expiryYear: 2025,
      isDefault: false,
    },
  ];

  const billingHistory = [
    {
      id: '1',
      date: '2024-01-15',
      description: 'Professional Plan - Monthly',
      amount: 29.99,
      status: 'paid',
      invoice: 'INV-2024-001',
    },
    {
      id: '2',
      date: '2023-12-15',
      description: 'Professional Plan - Monthly',
      amount: 29.99,
      status: 'paid',
      invoice: 'INV-2023-089',
    },
    {
      id: '3',
      date: '2023-11-15',
      description: 'Professional Plan - Monthly',
      amount: 29.99,
      status: 'paid',
      invoice: 'INV-2023-078',
    },
    {
      id: '4',
      date: '2023-10-15',
      description: 'Setup Fee',
      amount: 49.99,
      status: 'paid',
      invoice: 'INV-2023-067',
    },
  ];

  const usageStats = {
    projects: { current: 47, limit: 'unlimited' },
    storage: { current: 15.2, limit: 100, unit: 'GB' },
    apiCalls: { current: 8547, limit: 100000 },
    teamMembers: { current: 3, limit: 10 },
  };

  const plans = [
    {
      name: 'Basic',
      price: 9.99,
      features: ['5 Projects', '10GB Storage', 'Email Support', 'Basic Analytics'],
      popular: false,
    },
    {
      name: 'Professional',
      price: 29.99,
      features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics', 'API Access'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 99.99,
      features: ['Everything in Pro', 'Unlimited Storage', '24/7 Phone Support', 'Custom Integrations', 'Dedicated Manager'],
      popular: false,
    },
  ];

  const sections = [
    {
      id: 'subscription',
      name: 'Subscription',
      icon: StarIcon,
      description: 'Current plan and billing details',
    },
    {
      id: 'payment',
      name: 'Payment Methods',
      icon: CreditCardIcon,
      description: 'Manage your credit cards',
    },
    {
      id: 'history',
      name: 'Billing History',
      icon: DocumentTextIcon,
      description: 'View past invoices and payments',
    },
    {
      id: 'usage',
      name: 'Usage & Limits',
      icon: ChartBarIcon,
      description: 'Monitor your account usage',
    },
  ];

  const getCardIcon = (type: string) => {
    const iconClass = "h-8 w-12";
    switch (type) {
      case 'visa':
        return <div className={`${iconClass} bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold`}>VISA</div>;
      case 'mastercard':
        return <div className={`${iconClass} bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold`}>MC</div>;
      case 'amex':
        return <div className={`${iconClass} bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold`}>AMEX</div>;
      default:
        return <CreditCardIcon className={`${iconClass} text-gray-400`} />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderSubscription = () => (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-primary-900">Current Plan</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-primary-700">{subscriptionData.plan}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                subscriptionData.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {subscriptionData.status}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary-700">
              ${subscriptionData.price}
            </div>
            <div className="text-sm text-primary-600">
              per {subscriptionData.billingCycle}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="text-sm font-medium text-primary-800 mb-2">Features Included:</h4>
            <ul className="space-y-1">
              {subscriptionData.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-primary-700">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-primary-800 mb-2">Billing Information:</h4>
            <div className="space-y-2 text-sm text-primary-700">
              <div>Next bill date: <span className="font-medium">{formatDate(subscriptionData.nextBillDate)}</span></div>
              <div>Billing cycle: <span className="font-medium capitalize">{subscriptionData.billingCycle}</span></div>
              <div>Auto-renewal: <span className="font-medium text-green-600">Enabled</span></div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
            Change Plan
          </button>
          <button className="px-4 py-2 bg-white text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors font-medium">
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* Available Plans */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative border rounded-lg p-6 ${
              plan.popular 
                ? 'border-primary-300 bg-primary-50' 
                : 'border-gray-200 bg-white'
            }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-3 py-1 text-xs font-medium rounded-full">
                    Current Plan
                  </span>
                </div>
              )}
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                <div className="text-3xl font-bold text-gray-700 mt-2">
                  ${plan.price}
                  <span className="text-lg font-normal text-gray-500">/month</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                disabled={plan.popular}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {plan.popular ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Payment Method
        </button>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white">
            <div className="flex items-center space-x-4">
              {getCardIcon(method.type)}
              <div>
                <div className="font-medium text-gray-900">
                  •••• •••• •••• {method.last4}
                </div>
                <div className="text-sm text-gray-500">
                  Expires {method.expiryMonth}/{method.expiryYear}
                </div>
              </div>
              {method.isDefault && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Default
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {!method.isDefault && (
                <button className="px-3 py-1 text-sm text-primary-600 hover:text-primary-700 font-medium">
                  Make Default
                </button>
              )}
              <button className="p-2 text-red-600 hover:text-red-700 transition-colors">
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {paymentMethods.length === 0 && (
        <div className="text-center py-8">
          <CreditCardIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods</h3>
          <p className="text-gray-500 mb-4">Add a payment method to manage your subscription.</p>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
            Add Payment Method
          </button>
        </div>
      )}
    </div>
  );

  const renderBillingHistory = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
        <button className="flex items-center px-4 py-2 text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors font-medium">
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          Download All
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {billingHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(item.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${item.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : item.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status === 'paid' && <CheckCircleIcon className="h-3 w-3 mr-1" />}
                      {item.status === 'pending' && <ExclamationTriangleIcon className="h-3 w-3 mr-1" />}
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.invoice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsage = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Usage & Limits</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(usageStats).map(([key, stat]) => {
          const percentage = stat.limit === 'unlimited' ? 0 : (stat.current / stat.limit) * 100;
          const isNearLimit = percentage > 80;
          
          return (
            <div key={key} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    {typeof stat.current === 'number' ? stat.current.toLocaleString() : stat.current}
                    {stat.unit && ` ${stat.unit}`}
                  </div>
                  <div className="text-sm text-gray-500">
                    {stat.limit === 'unlimited' ? 'Unlimited' : `of ${stat.limit.toLocaleString()}${stat.unit ? ` ${stat.unit}` : ''}`}
                  </div>
                </div>
              </div>
              
              {stat.limit !== 'unlimited' && (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isNearLimit ? 'bg-red-500' : 'bg-primary-600'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{percentage.toFixed(1)}% used</span>
                    {isNearLimit && (
                      <span className="text-red-600 font-medium">Near limit</span>
                    )}
                  </div>
                </>
              )}
              
              {stat.limit === 'unlimited' && (
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  Unlimited usage
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Usage Trends */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Usage Trends</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center text-green-600 mb-2">
              <ArrowUpIcon className="h-5 w-5 mr-1" />
              <span className="font-semibold">+15%</span>
            </div>
            <div className="text-sm text-gray-600">Projects this month</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center text-blue-600 mb-2">
              <ArrowUpIcon className="h-5 w-5 mr-1" />
              <span className="font-semibold">+8%</span>
            </div>
            <div className="text-sm text-gray-600">Storage usage</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-center text-purple-600 mb-2">
              <ArrowDownIcon className="h-5 w-5 mr-1" />
              <span className="font-semibold">-5%</span>
            </div>
            <div className="text-sm text-gray-600">API calls</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'subscription':
        return renderSubscription();
      case 'payment':
        return renderPaymentMethods();
      case 'history':
        return renderBillingHistory();
      case 'usage':
        return renderUsage();
      default:
        return renderSubscription();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Billing & Subscription</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Billing Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeSection === section.id
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <section.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                <div className="flex-1 text-left">
                  <div className="font-medium">{section.name}</div>
                  <div className="text-xs text-gray-500 hidden lg:block">
                    {section.description}
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Billing Content */}
        <div className="lg:col-span-3">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            {renderSectionContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBilling;