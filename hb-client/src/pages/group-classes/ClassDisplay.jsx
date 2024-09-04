import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import { formatCurrency } from '../../utilities/formatter';
import { useNavigate } from 'react-router-dom';
import AddToCart from '../add-to-cart/AddToCart'; // Import the AddToCart component
import './classes.css';

export const ClassDisplay = () => {
    const [classData, setClassData] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [isCartOpen, setCartOpen] = useState(false); // State for controlling modal visibility
    const [selectedClass, setSelectedClass] = useState(null); // State to store selected class data
    const [selectedDay, setSelectedDay] = useState(''); // State to store selected day
    const navigate = useNavigate();

    useEffect(() => {
        fetchClasses(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

    const fetchClasses = (month, year) => {
        fetch(`http://localhost:5022/api/Classes/byMonth?month=${month}&year=${year}`)
            .then(res => res.json())
            .then(data => {
                const groupedData = groupByDay(data);
                setClassData(groupedData);
            })
            .catch(err => {
                console.error(err);
                setClassData({});
            });
    };

    const groupByDay = (data) => {
        const groupedData = {};

        data.forEach((item) => {
            item.classDays.forEach(({ dayName }) => {
                if (!groupedData[dayName]) {
                    groupedData[dayName] = [];
                }
                groupedData[dayName].push(item);
            });
        });

        const orderedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        return Object.keys(groupedData)
            .sort((a, b) => orderedDays.indexOf(a) - orderedDays.indexOf(b))
            .reduce((acc, key) => {
                acc[key] = groupedData[key];
                return acc;
            }, {});
    };

    const handleAddToCart = (day, classItem) => {
        setSelectedDay(day);
        setSelectedClass(classItem);
        setCartOpen(true);
    };

    const handleCloseCart = () => {
        setCartOpen(false);
    };

    return (
        <div className="class-display">
            <div className="class-display-header-container">
                <span className="class-display-header">Classes for the month of</span>
                <Grid item>
                    <FormControl style={{ minWidth: 120, marginLeft: 10, marginRight: 10 }} variant="standard">
                        <InputLabel>Month</InputLabel>
                        <Select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            disableUnderline
                        >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                <MenuItem key={month} value={month}>
                                    {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl style={{ minWidth: 120, marginLeft: 10, marginRight: 10 }} variant="standard">
                        <InputLabel>Year</InputLabel>
                        <Select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            disableUnderline
                        >
                            {[new Date().getFullYear(), new Date().getFullYear() + 1].map(year => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </div>
            {Object.keys(classData).length === 0 ? (
                <div className="no-classes">No classes available for the selected month and year.</div>
            ) : (
                Object.entries(classData).map(([day, classes]) => (
                    <div key={day} className="day-section">
                        <div className="day-header">
                            <span className="line"></span>
                            <span>{day}</span>
                            <span className="line"></span>
                        </div>
                        {classes.map((classItem) => (
                            <div key={classItem.id} className="class-item">
                                <div className="class-display-item class-name-time">
                                    <span className="class-name">
                                        {classItem.name}
                                    </span>
                                    <span className="class-time">
                                        ({new Date(`1970-01-01T${classItem.startTime}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} - {new Date(`1970-01-01T${classItem.endTime}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })})
                                    </span>
                                    <Button className="add-to-cart" onClick={() => handleAddToCart(day, classItem)}>Add to Cart</Button>
                                </div>
                                <div className="class-display-item">
                                    <span><b>Level(s):</b></span>
                                    <span>{classItem.classLevels.map(l => l.levelName).join(', ')}</span>
                                </div>
                                <div className="class-display-item">
                                    <span><b>Instructor(s):</b></span>
                                    <span>{classItem.instructor}</span>
                                </div>
                                <div className="class-display-item">
                                    <span><b>Description:</b></span>
                                    <span>{classItem.description}</span>
                                </div>
                                <div className="class-display-item">
                                    <span><b>Price:</b></span>
                                    <span>{formatCurrency(classItem.price)}</span>
                                </div>
                                {classItem.monthlyEligible && (
                                    <div className="class-display-item">
                                        <i>Eligible for monthly plan</i>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))
            )}

            {/* AddToCart Modal */}
            {selectedClass && (
                <AddToCart
                    open={isCartOpen}
                    onClose={handleCloseCart}
                    type="class"
                    day={selectedDay}
                    month={selectedMonth}
                    classItem={selectedClass}
                />
            )}
        </div>
    );
};
