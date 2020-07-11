import { CircularProgress, Snackbar } from '@material-ui/core';
import React from 'react';

const SnackbarProgress = (properties: { open: boolean }) => {
    return (
        <Snackbar open={properties.open}>
            <CircularProgress color={'secondary'}/>
        </Snackbar>
    );
};

export default SnackbarProgress;
