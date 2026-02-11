import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';

const CourseBlock = ({ course }) => {
    return (
        <Card variant="outlined" style={{ margin: '10px', backgroundColor: '#f9f9f9' }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {course.subject}
                </Typography>
                <Typography color="text.secondary">
                    {course.class} - {course.time}
                </Typography>
                <Typography variant="body2">
                    {course.teacher}
                </Typography>
            </CardContent>
        </Card>
    );
};

CourseBlock.propTypes = {
    course: PropTypes.shape({
        subject: PropTypes.string.isRequired,
        class: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        teacher: PropTypes.string.isRequired,
    }).isRequired,
};

export default CourseBlock;