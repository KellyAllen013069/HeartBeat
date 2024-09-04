import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import Header from './components/Header';
import NavBar from './components/nav/NavBar';
import WordCloudComponent from './components/WordCloud';
import Login from './pages/Login';
import AddDanceClass from './pages/admin/AddDanceClass';
import AdminMain from "./pages/admin/AdminMain";
import {ClassDisplay} from "./pages/group-classes/ClassDisplay"
import AddToCart from "./pages/add-to-cart/AddToCart";

Amplify.configure(awsExports);

function App() {
    return (

            <Router>
                <UserProvider>
                <Header />
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
                </main>
                </UserProvider>
            </Router>
    )
}

export default App;
