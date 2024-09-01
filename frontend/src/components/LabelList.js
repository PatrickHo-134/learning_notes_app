import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLabels } from '../actions/labelActions';
import { CircularProgress, Chip, Box } from '@mui/material';

const LabelList = () => {
    const dispatch = useDispatch();

    const labelList = useSelector((state) => state.labelList);
    const { loading, error, labels } = labelList;

    useEffect(() => {
        dispatch(fetchLabels());
    }, [dispatch]);

    return (
        <Box sx={{ marginTop: '1rem', marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <span>{error}</span>
            ) : (
                labels.map((label) => (
                    <Chip
                        key={label.id}
                        label={label.name}
                        style={{ backgroundColor: label.color }}
                    />
                ))
            )}
        </Box>
    );
};

export default LabelList;
