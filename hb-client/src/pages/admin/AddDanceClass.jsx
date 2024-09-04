import React, { useState, useEffect } from 'react';
import { TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDanceClass = () => {
    const { id } = useParams();  // Get the class ID from the URL
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [instructor, setInstructor] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [price, setPrice] = useState(15.00);
    const [coupon, setCoupon] = useState("");
    const [monthlyEligible, setMonthlyEligible] = useState(false);
    const [levels, setLevels] = useState({
        beginner: false,
        intermediate: false,
        advanced: false,
    });
    const [days, setDays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Fetch the class data from the API using the id
            fetch(`http://localhost:5022/api/Classes/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setName(data.name);
                    setDescription(data.description);
                    setInstructor(data.instructor);
                    setStartTime(data.startTime.slice(0, 5));  // Assuming time comes in a standard format
                    setEndTime(data.endTime.slice(0, 5));
                    setStartDate(data.startDate);
                    setEndDate(data.endDate);
                    setPrice(data.price);
                    setCoupon(data.coupon);
                    setMonthlyEligible(data.monthlyEligible);
                    setLevels({
                        beginner: data.classLevels.some(l => l.levelName === 'Beginner'),
                        intermediate: data.classLevels.some(l => l.levelName === 'Intermediate'),
                        advanced: data.classLevels.some(l => l.levelName === 'Advanced'),
                    });
                    setDays({
                        monday: data.classDays.some(d => d.dayName === 'Monday'),
                        tuesday: data.classDays.some(d => d.dayName === 'Tuesday'),
                        wednesday: data.classDays.some(d => d.dayName === 'Wednesday'),
                        thursday: data.classDays.some(d => d.dayName === 'Thursday'),
                        friday: data.classDays.some(d => d.dayName === 'Friday'),
                        saturday: data.classDays.some(d => d.dayName === 'Saturday'),
                        sunday: data.classDays.some(d => d.dayName === 'Sunday'),
                    });
                })
                .catch((err) => console.error(err));
        }
    }, [id]);

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toISOString().slice(0, 10);
    };

    const addClass = (e) => {
        e.preventDefault();

        const reqBody = {
            ...(id && { id }),
            name,
            description,
            instructor,
            startTime: startTime ? startTime + ":00" : null,
            endTime: endTime ? endTime + ":00" : null,
            startDate: startDate ? formatDate(startDate) : null,
            endDate: endDate ? formatDate(endDate) : null,
            price,
            coupon,
            monthlyEligible,
            classDays: [
                days.monday && { id: 1, dayName: "Monday" },
                days.tuesday && { id: 2, dayName: "Tuesday" },
                days.wednesday && { id: 3, dayName: "Wednesday" },
                days.thursday && { id: 4, dayName: "Thursday" },
                days.friday && { id: 5, dayName: "Friday" },
                days.saturday && { id: 6, dayName: "Saturday" },
                days.sunday && { id: 7, dayName: "Sunday" }
            ].filter(Boolean),
            classLevels: [
                levels.beginner && { id: 1, levelName: "Beginner" },
                levels.intermediate && { id: 2, levelName: "Intermediate" },
                levels.advanced && { id: 3, levelName: "Advanced" }
            ].filter(Boolean)
        };

        console.log(JSON.stringify(reqBody, null, 2));

        const method = id ? "PUT" : "POST";
        const url = id
            ? `http://localhost:5022/api/Classes/${id}`
            : `http://localhost:5022/api/Classes`;

        fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to ${method === "POST" ? "create" : "update"} class`);

                if (res.status === 204 || res.status === 200) {
                    toast.success(`Class ${method === "POST" ? "created" : "updated"} successfully!`, {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    setTimeout(() => {
                        navigate("/Admin");
                    }, 3500);
                }
            })
            .catch((err) => {
                toast.error(`Error: ${err.message}`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            });

    };

    return (
        <div className="add-dance-class">
            <form className="class-input" onSubmit={addClass}>
                <TextField id="name" label="Class Name" variant="standard" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
                <TextField id="description" label="Description" variant="standard" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth required />
                <TextField id="instructor" label="Instructor(s)" variant="standard" value={instructor} onChange={(e) => setInstructor(e.target.value)} fullWidth required />

                <div className="levels-title">----- Levels -----</div>
                <div className="form-group-horizontal">
                    <FormControlLabel control={<Checkbox checked={levels.beginner} onChange={() => setLevels({ ...levels, beginner: !levels.beginner })} />} label="Beginner" />
                    <FormControlLabel control={<Checkbox checked={levels.intermediate} onChange={() => setLevels({ ...levels, intermediate: !levels.intermediate })} />} label="Intermediate" />
                    <FormControlLabel control={<Checkbox checked={levels.advanced} onChange={() => setLevels({ ...levels, advanced: !levels.advanced })} />} label="Advanced" />
                </div>

                <div className="days-title">----- Days -----</div>
                <div className="form-group-horizontal">
                    <FormControlLabel control={<Checkbox checked={days.monday} onChange={() => setDays({ ...days, monday: !days.monday })} />} label="Monday" />
                    <FormControlLabel control={<Checkbox checked={days.tuesday} onChange={() => setDays({ ...days, tuesday: !days.tuesday })} />} label="Tuesday" />
                    <FormControlLabel control={<Checkbox checked={days.wednesday} onChange={() => setDays({ ...days, wednesday: !days.wednesday })} />} label="Wednesday" />
                    <FormControlLabel control={<Checkbox checked={days.thursday} onChange={() => setDays({ ...days, thursday: !days.thursday })} />} label="Thursday" />
                    <FormControlLabel control={<Checkbox checked={days.friday} onChange={() => setDays({ ...days, friday: !days.friday })} />} label="Friday" />
                    <FormControlLabel control={<Checkbox checked={days.saturday} onChange={() => setDays({ ...days, saturday: !days.saturday })} />} label="Saturday" />
                    <FormControlLabel control={<Checkbox checked={days.sunday} onChange={() => setDays({ ...days, sunday: !days.sunday })} />} label="Sunday" />
                </div>

                <div className="time-row">
                    <TextField
                        id="start-time"
                        label="Start Time"
                        type="time"
                        variant="standard"
                        inputProps={{
                            step: 900, // 15 minutes in seconds
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                    <TextField
                        id="end-time"
                        label="End Time"
                        type="time"
                        variant="standard"
                        inputProps={{
                            step: 900, // 15 minutes in seconds
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>

                <div className="date-row">
                    <TextField
                        id="start-date"
                        label="Select Start Date"
                        type="date"
                        variant="standard"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={startDate ? formatDate(startDate) : ""}
                        onChange={(e) => setStartDate(e.target.valueAsDate)}
                        required
                    />
                    <TextField
                        id="end-date"
                        label="Select End Date"
                        type="date"
                        variant="standard"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={endDate ? formatDate(endDate) : ""}
                        onChange={(e) => setEndDate(e.target.valueAsDate)}
                        required
                    />
                </div>

                <TextField id="price" type='number' label="Price: $" variant="standard" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth required />

                <TextField id="coupon" label="Coupon Code" variant="standard" value={coupon} onChange={(e) => setCoupon(e.target.value)} fullWidth />

                <FormControlLabel control={<Checkbox checked={monthlyEligible} onChange={() => setMonthlyEligible(!monthlyEligible)} />} label="Eligible for Monthly Payment" />

                <div className="button-container">
                    <Button type="submit">{id ? "Update Class" : "Add Class"}</Button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddDanceClass;
