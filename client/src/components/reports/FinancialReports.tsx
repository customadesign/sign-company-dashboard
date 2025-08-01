import React from 'react';
import { BanknotesIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FinancialReportsProps {
  dateRange: string;
  filters: Record<string, any>;
  onFiltersChange: (filters: Record<string, any>) => void;
}

const FinancialReports: React.FC<FinancialReportsProps> = ({ dateRange, filters, onFiltersChange }) => {
  // Mock data
  const cashFlowData = [
    { month: 'Jan', income: 85000, expenses: 62000, netCash: 23000 },
    { month: 'Feb', income: 92000, expenses: 68000, netCash: 24000 },
    { month: 'Mar', income: 88000, expenses: 71000, netCash: 17000 },
    { month: 'Apr', income: 95000, expenses: 69000, netCash: 26000 },
    { month: 'May', income: 91000, expenses: 73000, netCash: 18000 },
    { month: 'Jun', income: 98000, expenses: 72000, netCash: 26000 },
  ];

  const expenseBreakdown = [
    { category: 'Labor', amount: 125000, percentage: 35 },
    { category: 'Materials', amount: 89000, percentage: 25 },
    { category: 'Equipment', amount: 71000, percentage: 20 },
    { category: 'Operations', amount: 53000, percentage: 15 },
    { category: 'Marketing', amount: 18000, percentage: 5 },
  ];

  const profitMargins = [
    { month: 'Jan', gross: 42, operating: 28, net: 18 },
    { month: 'Feb', gross: 45, operating: 31, net: 21 },
    { month: 'Mar', gross: 41, operating: 27, net: 17 },
    { month: 'Apr', gross: 48, operating: 34, net: 24 },
    { month: 'May', gross: 44, operating: 30, net: 20 },
    { month: 'Jun', gross: 47, operating: 33, net: 23 },
  ];

  const financialSummary = {
    totalRevenue: 549000,
    totalExpenses: 413000,
    grossProfit: 136000,
    netIncome: 98500,
    ebitda: 125000,
    currentRatio: 2.3,
  };

  const stats = [
    { 
      label: 'Total Revenue', 
      value: `$${(financialSummary.totalRevenue / 1000).toFixed(0)}k`,
      change: '+15.2%',
      positive: true,
      icon: BanknotesIcon,
    },
    { 
      label: 'Net Income', 
      value: `$${(financialSummary.netIncome / 1000).toFixed(1)}k`,
      change: '+18.5%',
      positive: true,
      icon: ArrowTrendingUpIcon,
    },
    { 
      label: 'Gross Margin', 
      value: '44.7%',
      change: '+2.3%',
      positive: true,
      icon: ArrowTrendingUpIcon,
    },
    { 
      label: 'Current Ratio', 
      value: '2.3',
      change: '+0.4',
      positive: true,
      icon: DocumentTextIcon,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Financial Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`h-8 w-8 ${stat.positive ? 'text-green-600' : 'text-red-600'}`} />
              <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Cash Flow Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow Analysis</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cashFlowData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="income" stackId="1" stroke="#52c41a" fill="#52c41a" fillOpacity={0.6} name="Income" />
              <Area type="monotone" dataKey="expenses" stackId="2" stroke="#f5222d" fill="#f5222d" fillOpacity={0.6} name="Expenses" />
              <Line type="monotone" dataKey="netCash" stroke="#1890ff" strokeWidth={3} name="Net Cash Flow" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
          <div className="space-y-4">
            {expenseBreakdown.map((expense, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{expense.category}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${(expense.amount / 1000).toFixed(0)}k ({expense.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${expense.percentage}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">Total Expenses</span>
                <span className="text-sm font-bold text-gray-900">
                  ${(expenseBreakdown.reduce((sum, exp) => sum + exp.amount, 0) / 1000).toFixed(0)}k
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profit Margins Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit Margins Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitMargins} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="gross" stroke="#52c41a" strokeWidth={2} name="Gross Margin %" />
                <Line type="monotone" dataKey="operating" stroke="#1890ff" strokeWidth={2} name="Operating Margin %" />
                <Line type="monotone" dataKey="net" stroke="#722ed1" strokeWidth={2} name="Net Margin %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">Income Statement</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="text-sm font-medium text-gray-900">${(financialSummary.totalRevenue / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cost of Goods Sold</span>
                <span className="text-sm font-medium text-gray-900">-${((financialSummary.totalRevenue - financialSummary.grossProfit) / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-sm font-medium text-gray-700">Gross Profit</span>
                <span className="text-sm font-bold text-gray-900">${(financialSummary.grossProfit / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Operating Expenses</span>
                <span className="text-sm font-medium text-gray-900">-${((financialSummary.grossProfit - financialSummary.netIncome) / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-sm font-medium text-gray-700">Net Income</span>
                <span className="text-sm font-bold text-green-600">${(financialSummary.netIncome / 1000).toFixed(1)}k</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">Key Metrics</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">EBITDA</span>
                <span className="text-sm font-medium text-gray-900">${(financialSummary.ebitda / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current Ratio</span>
                <span className="text-sm font-medium text-gray-900">{financialSummary.currentRatio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Debt to Equity</span>
                <span className="text-sm font-medium text-gray-900">0.45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ROE</span>
                <span className="text-sm font-medium text-gray-900">22.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ROA</span>
                <span className="text-sm font-medium text-gray-900">15.8%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Download P&L Statement
              </button>
              <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Export Balance Sheet
              </button>
              <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Generate Tax Report
              </button>
              <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                View Audit Trail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;