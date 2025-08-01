import React from 'react';
import { WrenchScrewdriverIcon, TruckIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/solid';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

interface EquipmentROIProps {
  dateRange: string;
  filters: Record<string, any>;
  onFiltersChange: (filters: Record<string, any>) => void;
}

const EquipmentROI: React.FC<EquipmentROIProps> = ({ dateRange, filters, onFiltersChange }) => {
  // Mock data
  const equipmentUtilization = [
    { name: 'Vinyl Plotter', utilization: 85, revenue: 45000, maintenance: 2500 },
    { name: 'Large Format Printer', utilization: 92, revenue: 78000, maintenance: 4200 },
    { name: 'CNC Router', utilization: 68, revenue: 52000, maintenance: 3800 },
    { name: 'Welding Equipment', utilization: 45, revenue: 28000, maintenance: 1500 },
    { name: 'Bucket Truck', utilization: 72, revenue: 38000, maintenance: 5500 },
  ];

  const roiTrendData = [
    { month: 'Jan', roi: 185, utilization: 68 },
    { month: 'Feb', roi: 210, utilization: 72 },
    { month: 'Mar', roi: 195, utilization: 70 },
    { month: 'Apr', roi: 225, utilization: 78 },
    { month: 'May', roi: 245, utilization: 82 },
    { month: 'Jun', roi: 238, utilization: 80 },
  ];

  const maintenanceSchedule = [
    { equipment: 'Large Format Printer', lastService: '2024-01-05', nextService: '2024-02-05', status: 'Due Soon' },
    { equipment: 'CNC Router', lastService: '2024-01-10', nextService: '2024-02-10', status: 'Scheduled' },
    { equipment: 'Vinyl Plotter', lastService: '2024-01-15', nextService: '2024-02-15', status: 'Good' },
    { equipment: 'Bucket Truck', lastService: '2023-12-20', nextService: '2024-01-20', status: 'Overdue' },
  ];

  const stats = [
    { 
      label: 'Total Equipment Value', 
      value: '$425,000', 
      icon: WrenchScrewdriverIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    { 
      label: 'Avg. Utilization', 
      value: '72.4%', 
      icon: ClockIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    { 
      label: 'Monthly Revenue', 
      value: '$48,200', 
      icon: CurrencyDollarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    { 
      label: 'Maintenance Cost', 
      value: '$3,400/mo', 
      icon: TruckIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Equipment Utilization and Revenue */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment Performance</h3>
        <div className="space-y-4">
          {equipmentUtilization.map((equipment, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">{equipment.name}</h4>
                <span className="text-sm font-semibold text-green-600">
                  ${((equipment.revenue - equipment.maintenance) / 1000).toFixed(1)}k net
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Utilization</p>
                  <div className="flex items-center mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${equipment.utilization}%` }}
                      />
                    </div>
                    <span className="font-medium text-gray-900">{equipment.utilization}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500">Revenue</p>
                  <p className="font-medium text-gray-900">${(equipment.revenue / 1000).toFixed(0)}k</p>
                </div>
                <div>
                  <p className="text-gray-500">Maintenance</p>
                  <p className="font-medium text-gray-900">${(equipment.maintenance / 1000).toFixed(1)}k</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI & Utilization Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={roiTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="roi" 
                stroke="#1890ff" 
                strokeWidth={3}
                name="ROI %"
                dot={{ fill: '#1890ff' }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="utilization" 
                stroke="#52c41a" 
                strokeWidth={2}
                name="Utilization %"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Maintenance Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Schedule</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equipment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {maintenanceSchedule.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.equipment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lastService}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.nextService}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${
                      item.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                      item.status === 'Due Soon' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EquipmentROI;