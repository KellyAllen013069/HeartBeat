import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import './admin.css';

function AdminList() {
    const navigate = useNavigate();
    const [classData, setClassData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5022/api/Classes')
            .then(res => res.json())
            .then(data => {
                // console.log("data is " + JSON.stringify(data));
                setClassData(data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    function goToAddClass() {
         navigate('/addClass');
    }

    function formatTime(militaryTime) {
        if (!militaryTime) return militaryTime;
        militaryTime = militaryTime.substr(0, 5);
        const [hours, minutes] = militaryTime.split(":").map(Number);
        const twelveHour = hours % 12 || 12;
        return `${twelveHour}:${minutes.toString().padStart(2, "0")}`;
    }

    function updateClass(id) {
        navigate(`/addClass/${id}`);
    }

    return (
        <div>
            <div>
                <table className='admin-table'>
                    <thead>
                    <tr style={{ fontWeight: 'bold' }}>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Time</td>
                        <td>Start Date</td>
                        <td>End Date</td>
                        <td>Level(s)</td>
                        <td>Day(s)</td>
                    </tr>
                    </thead>
                    <tbody>
                    {classData.map((c) => (
                        <tr id={c.id} className="admin-table-row" key={c.id} onClick={() => updateClass(c.id)} >
                            <td>{c.name}</td>
                            <td>{c.description.substr(0, 20).concat("...")}</td>
                            <td>{formatTime(c.startTime) + " - " + formatTime(c.endTime)}</td>
                            <td>{c.startDate.substr(0, 10)}</td>
                            <td>{c.endDate.substr(0, 10)}</td>
                            <td>{c.classLevels.map(level => level.levelName).join(', ')}</td>
                            <td>{c.classDays.map(day => day.dayName).join(', ')}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div>
                <br/><br/>
                <button onClick={goToAddClass}>Add Class</button>
            </div>
        </div>
    );
}

export default AdminList;
