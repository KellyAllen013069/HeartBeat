import React from 'react';
import './CartModal.css';
import { useCart } from '../../contexts/CartContext';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

const CartModal = ({ onClose }) => {
    const { cart } = useCart(); // Access cart instead of cartItems

    return (
        <div className="cart-modal-backdrop">
            <div className="cart-modal">
                <h2>Shopping Cart</h2>
                {cart && cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        {cart && cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <h4 style={{ color: 'red', textAlign: 'center' }}>{item.className}</h4>
                                <p><b>Day:</b> {item.day}</p>
                                <p><b>Month:</b> {item.month}</p>
                                <p><b>Price:</b> {item.price}</p>
                                {item.monthlyEligible && (
                                    <p><b>Eligible for monthly plan</b></p>
                                )}
                                <Divider />
                            </div>
                        ))}
                        <div className="cart-total">
                            <h3>Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</h3>
                        </div>
                        <Button onClick={onClose}>Close</Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartModal;
