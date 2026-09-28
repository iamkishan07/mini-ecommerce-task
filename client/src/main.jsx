import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import AppRoutes from './router/AppRoutes.jsx'
import { ProductProvider } from './context/ProductContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <ProductProvider>
        <AppRoutes/>
        </ProductProvider>
    </AuthProvider>
)
