import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Waves, AtSign, Lock, AlertOctagon, Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, userRole, isAuthenticated } = useAuthStore();
  
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(userRole === 'admin' ? '/admin' : '/superadmin');
    }
  }, [isAuthenticated, userRole, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor ingresa tu email y contraseña');
      return;
    }
    
    try {
      setLoading(true);
      await login(email, password);
    } catch (err) {
      setError((err as Error).message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };
  
  const demoAccounts = [
    { 
      label: 'Admin Paradise', 
      email: 'admin1@example.com', 
      password: 'password',
      description: 'Administrador de Acuático Paradise'
    },
    { 
      label: 'Admin Aqua Fun', 
      email: 'admin2@example.com', 
      password: 'password',
      description: 'Administrador de Aqua Fun'
    },
    { 
      label: 'Super Admin', 
      email: 'superadmin@example.com', 
      password: 'password',
      description: 'Administrador General'
    },
  ];
  
  const setDemoAccount = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-light via-white to-blue-soft/30 particle-bg flex flex-col justify-center responsive-padding">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center
                        mb-4
                        xs:mb-5
                        sm:mb-6
                        md:mb-8
                        lg:mb-10">
          <div className="flex items-center justify-center bg-gradient-to-br from-midnight-blue via-navy-blue to-sky-muted shadow-large hover:shadow-xl transition-all duration-300 hover:scale-110 animate-float
                          w-12 h-12 rounded-2xl
                          xs:w-14 xs:h-14 xs:rounded-3xl
                          sm:w-16 sm:h-16
                          md:w-20 md:h-20 md:rounded-4xl
                          lg:w-24 lg:h-24">
            <Waves className="text-white
                              h-6 w-6
                              xs:h-7 xs:w-7
                              sm:h-8 sm:w-8
                              md:h-10 md:w-10
                              lg:h-12 lg:w-12" />
          </div>
        </div>
        <h2 className="text-center gradient-text font-bold
                       text-xl mb-2
                       xs:text-2xl xs:mb-3
                       sm:text-3xl sm:mb-3
                       md:text-4xl md:mb-4
                       lg:text-5xl lg:mb-4">
          Panel de Administración
        </h2>
        <p className="text-center text-sky-muted font-semibold
                      text-sm
                      xs:text-base
                      sm:text-base
                      md:text-lg
                      lg:text-lg">
          Gestión integral de balnearios
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md
                      mt-4
                      xs:mt-6
                      sm:mt-8
                      md:mt-10
                      lg:mt-12">
        <div className="card shadow-large animate-scale-in">
          {error && (
            <div className="bg-error-50/90 backdrop-blur-sm border-2 border-error-200/50 flex items-start animate-slide-in
                            mb-4 p-3 rounded-lg
                            xs:mb-5 xs:p-4 xs:rounded-xl
                            sm:mb-6 sm:p-4 sm:rounded-xl
                            md:mb-8 md:p-6 md:rounded-2xl">
              <AlertOctagon className="text-error-500 mt-0.5 flex-shrink-0
                                      h-4 w-4 mr-2
                                      xs:h-5 xs:w-5 xs:mr-3
                                      sm:h-6 sm:w-6 sm:mr-4" />
              <p className="text-error-700 font-semibold
                            text-xs
                            xs:text-sm
                            sm:text-sm">
                {error}
              </p>
            </div>
          )}
          
          <form className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="label">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none
                                pl-2
                                xs:pl-3
                                sm:pl-4
                                md:pl-5">
                  <AtSign className="text-sky-muted
                                    h-4 w-4
                                    xs:h-5 xs:w-5
                                    sm:h-5 sm:w-5
                                    md:h-6 md:w-6" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input
                             pl-8
                             xs:pl-10
                             sm:pl-12
                             md:pl-14"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="label">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none
                                pl-2
                                xs:pl-3
                                sm:pl-4
                                md:pl-5">
                  <Lock className="text-sky-muted
                                  h-4 w-4
                                  xs:h-5 xs:w-5
                                  sm:h-5 sm:w-5
                                  md:h-6 md:w-6" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input
                             pl-8 pr-8
                             xs:pl-10 xs:pr-10
                             sm:pl-12 sm:pr-12
                             md:pl-14 md:pr-14"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center hover:bg-sky-light/20 transition-colors duration-300
                             pr-2 rounded-r-lg
                             xs:pr-3 xs:rounded-r-xl
                             sm:pr-4 sm:rounded-r-xl
                             md:pr-5 md:rounded-r-2xl"
                >
                  {showPassword ? (
                    <EyeOff className="text-sky-muted hover:text-midnight-blue
                                      h-4 w-4
                                      xs:h-5 xs:w-5
                                      sm:h-5 sm:w-5
                                      md:h-6 md:w-6" />
                  ) : (
                    <Eye className="text-sky-muted hover:text-midnight-blue
                                    h-4 w-4
                                    xs:h-5 xs:w-5
                                    sm:h-5 sm:w-5
                                    md:h-6 md:w-6" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full flex justify-center font-bold
                           py-2.5
                           xs:py-3
                           sm:py-3.5
                           md:py-4
                           lg:py-5"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full border-b-2 border-white
                                    h-4 w-4 mr-2
                                    xs:h-5 xs:w-5 xs:mr-3
                                    sm:h-6 sm:w-6 sm:mr-4"></div>
                    <span className="text-xs xs:text-sm sm:text-base">Iniciando sesión...</span>
                  </div>
                ) : (
                  <span className="text-xs xs:text-sm sm:text-base">Iniciar sesión</span>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 xs:mt-8 sm:mt-10 md:mt-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-sky-light/40"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white text-sky-muted font-bold
                                px-3 text-xs
                                xs:px-4 xs:text-sm
                                sm:px-6 sm:text-base">
                  Cuentas de demostración
                </span>
              </div>
            </div>

            <div className="space-y-2 xs:space-y-3 sm:space-y-4
                            mt-4
                            xs:mt-6
                            sm:mt-8
                            md:mt-10">
              {demoAccounts.map((account) => (
                <button
                  key={account.label}
                  onClick={() => setDemoAccount(account.email, account.password)}
                  className="w-full text-left border-2 border-sky-light/40 shadow-soft bg-white/60 backdrop-blur-sm hover:bg-sky-light/30 hover:border-sky-muted/40 transition-all duration-300 hover:shadow-medium hover:scale-102
                             px-3 py-2.5 text-xs rounded-lg
                             xs:px-4 xs:py-3 xs:text-xs xs:rounded-xl
                             sm:px-5 sm:py-3.5 sm:text-sm sm:rounded-xl
                             md:px-6 md:py-4 md:text-sm md:rounded-2xl
                             lg:px-8 lg:py-5 lg:text-base lg:rounded-2xl"
                >
                  <div className="font-bold text-midnight-blue
                                  text-xs mb-1
                                  xs:text-sm xs:mb-1
                                  sm:text-base sm:mb-2">
                    {account.label}
                  </div>
                  <div className="text-sky-muted font-medium
                                  text-xs
                                  xs:text-xs
                                  sm:text-sm">
                    {account.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;