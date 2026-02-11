import React, { useState } from 'react';
import { useSchedule } from '../../hooks/useSchedule';

const ScheduleForm = ({ existingSchedule, onSubmit }) => {
    const { addSchedule, updateSchedule } = useSchedule();
    const [formData, setFormData] = useState({
        day: existingSchedule ? existingSchedule.day : '',
        startTime: existingSchedule ? existingSchedule.startTime : '',
        endTime: existingSchedule ? existingSchedule.endTime : '',
        class: existingSchedule ? existingSchedule.class : '',
        subject: existingSchedule ? existingSchedule.subject : '',
        school: existingSchedule ? existingSchedule.school : '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (existingSchedule) {
            updateSchedule(existingSchedule.id, formData);
        } else {
            addSchedule(formData);
        }
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Day</label>
                <input type="text" name="day" value={formData.day} onChange={handleChange} required />
            </div>
            <div>
                <label>Start Time</label>
                <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
            </div>
            <div>
                <label>End Time</label>
                <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
            </div>
            <div>
                <label>Class</label>
                <input type="text" name="class" value={formData.class} onChange={handleChange} required />
            </div>
            <div>
                <label>Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>
            <div>
                <label>School</label>
                <input type="text" name="school" value={formData.school} onChange={handleChange} required />
            </div>
            <button type="submit">{existingSchedule ? 'Update Schedule' : 'Add Schedule'}</button>
        </form>
    );
};

export default ScheduleForm;