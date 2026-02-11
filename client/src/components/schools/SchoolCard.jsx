import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';

const SchoolCard = ({ school }) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div">
                    {school.name}
                </Typography>
                <Typography color="text.secondary">
                    Type: {school.type}
                </Typography>
                <Typography variant="body2">
                    Classes: {school.classes.join(', ')}
                </Typography>
            </CardContent>
        </Card>
    );
};

SchoolCard.propTypes = {
    school: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        classes: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default SchoolCard;