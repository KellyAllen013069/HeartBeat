import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext'; // Import CartProvider
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import Header from './components/Header';
import NavBar from './components/nav/NavBar';
import WordCloudComponent from './components/WordCloud';
import Login from './pages/Login';
import AddDanceClass from './pages/admin/AddDanceClass';
import AdminMain from './pages/admin/AdminMain';
import { ClassDisplay } from './pages/group-classes/ClassDisplay';
import AddToCart from './pages/add-to-cart/AddToCart';
import CartModal from './components/cart-modal/CartModal';

Amplify.configure(awsExports);

function App() {
    const [isCartOpen, setCartOpen] = useState(false); // State for cart visibility

    // Function to toggle cart visibility
    const toggleCart = () => setCartOpen(!isCartOpen);

    return (
        <I18nextProvider i18n={i18n}>
            <Router>
                <UserProvider>
                    <CartProvider>
                        <Header toggleCart={toggleCart} />
                        <NavBar />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<WordCloudComponent />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/admin" element={<AdminMain />} />
                                <Route path="/addClass/:id?" element={<AddDanceClass />} />
                                <Route path="/group-classes" element={<ClassDisplay />} />
                                <Route path="/addToCart" element={<AddToCart />} />
                            </Routes>
                            {isCartOpen && <CartModal onClose={toggleCart} />}
                        </main>
                    </CartProvider>
                </UserProvider>
            </Router>
        </I18nextProvider>
    );
}

export default App;
