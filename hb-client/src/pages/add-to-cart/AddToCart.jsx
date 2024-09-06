import React from 'react';
import Button from '@mui/material/Button';
import './AddToCart.css';
import { useCart } from '../../contexts/CartContext';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AddToCart({ open, onClose, day, month, classItem }) {
    const { addToCart } = useCart();
    const { user } = useUser(); // Get the current user
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleAddToCart = () => {
        if (!user) {
            alert(t('must_log_in'));
            navigate('/login');
            return;
        }

        const newCartItem = {
            classId: classItem.id,
            className: classItem.name,
            day,
            month,
            price: classItem.price,
            monthlyEligible: classItem.monthlyEligible,
        };
        addToCart(newCartItem);
        onClose(); // Close the modal after adding to the cart
    };

    return open ? (
        <div className="add-to-cart-modal-backdrop">
            <div className="add-to-cart-modal">
                <h2 style={{ color: 'red', textAlign: 'center' }}>{classItem.name}</h2>
                <p><b>Day:</b> {day}</p>
                <p><b>Month:</b> {month}</p>
                <p><b>Price:</b> {classItem.price}</p>
                {classItem.monthlyEligible && (
                    <p><b>Eligible for monthly plan</b></p>
                )}
                <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
            </div>
        </div>
    ) : null;
}

export default AddToCart;
