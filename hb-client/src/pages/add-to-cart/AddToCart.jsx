import React, { useState } from 'react';
import { TextField, FormControl, RadioGroup, Radio, FormControlLabel, FormLabel, Button, Card, Dialog } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { getClassDates } from '../../utilities/getDates';
import { displayDay } from '../../utilities/formatter';
import './addToCart.css'; // Include your CSS file

function AddToCart() {
    const location = useLocation();
    const navigate = useNavigate();
    const { type, day, month, classItem = {} } = location.state || {};

    const [couponCode, setCouponCode] = useState(classItem.coupon || "");
    const [paymentType, setPaymentType] = useState("");

    console.log("Class Item is ", classItem);
    console.log("month is ", month);

    function addItemToCart(e) {
        console.log("e is ", e);
    }

    let dateArray = getClassDates(day, month);
    let dayDisplay = displayDay(day);

    return (
        <Dialog open={true} onClose={() => navigate(-1)}>
            <div className='cart-card'>
                <Card variant='outlined' className="custom-card">
                    <form id='cart-input' className='cart-input'>
                        <div className="item-name">
                            {classItem.name}
                        </div>
                        <div className="day-month-info">
                            Day is {dayDisplay} and month is {new Date(2024, month - 1).toLocaleString('default', { month: 'long' })}
                        </div>
                        <div className="date-list">
                            {dateArray.map(d => (
                                <div key={d.toISOString()}>
                                    {dayDisplay + " " + d.toLocaleDateString()}
                                </div>
                            ))}
                        </div>
                        <div className="eligibility-info">
                            Eligible for monthly plan: {classItem.monthlyEligible ? 'Yes' : 'No'}
                        </div>
                        <div className="form-section">
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label" style={{ fontSize: '1rem', marginTop: '1rem' }}>
                                    Payment Options
                                </FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={paymentType}
                                    onChange={(e) => setPaymentType(e.target.value)}
                                    style={{ marginTop: '0.5rem' }}
                                >
                                    <FormControlLabel value="current" control={<Radio sx={{ mb: '0.1rem' }} />} label={<span style={{ fontSize: '0.9rem' }} sx={{ mb: '0.1rem' }}>Selected class(es) at $15.00</span>} />
                                    <FormControlLabel value="advance" control={<Radio />} label={<span style={{ fontSize: '0.9rem' }} sx={{ mb: '0.1rem' }}> Selected class(es) at $12.50 in advance</span>} />
                                    {classItem.monthlyEligible && (
                                        <FormControlLabel
                                            value="monthly"
                                            control={<Radio />}
                                            label={<span style={{ fontSize: '0.9rem' }} sx={{ mb: '0.1rem' }}>$80 monthly plan (includes all classes at the studio that are monthly eligible)</span>}
                                        />
                                    )}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="coupon-section">
                            <TextField id="couponField" label="Coupon Code" variant="standard" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                        </div>
                        <div className="button-container">
                            <Button onClick={(e) => addItemToCart(e)}>Continue</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Dialog>
    );
}

export default AddToCart;
