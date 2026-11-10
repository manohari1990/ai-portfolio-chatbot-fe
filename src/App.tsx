import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/routers/PrivateRoute';
import PublicRoute from './components/routers/PublicRoute';
import { AuthPage } from './components/AuthPage';
import Dashboard from './pages/_authenticated/Dashboard';

function App() {

  return (
    <Routes>

      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path='/auth' element={
        <PublicRoute>
          <AuthPage />
        </PublicRoute>
      } />
    </Routes>
  )
}

export default App
