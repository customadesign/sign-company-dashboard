import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
      toast.success('Welcome back!');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="mb-4 p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl inline-block">
              <img
                src="https://storage.googleapis.com/msgsndr/DecfA7BjYEDxFe8pqRZs/media/688c08634a3ff3102330f5bf.png"
                alt="Sign World Logo"
                className="h-24 w-auto mx-auto drop-shadow-lg"
              />
            </div>
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Sign World
            </h2>
            <p className="mt-2 text-sm text-gray-600 font-medium">
              Owner Dashboard Portal
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                autoComplete="email"
                className="mt-1 appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 sm:text-sm"
                placeholder="admin@signworld.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                autoComplete="current-password"
                className="mt-1 appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 sm:text-sm"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-xs text-gray-600 font-medium">
                Demo credentials
              </p>
              <p className="text-xs text-gray-500 mt-1">
                admin@signworld.com / admin123
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;