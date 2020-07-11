import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { Icon } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            backgroundColor: theme.palette.secondary.main
        },
        speedDial: {
            position: 'fixed',
            '&.MuiSpeedDial-directionUp': {
                bottom: theme.spacing(8),
                right: theme.spacing(8),
            },
        },
    }),
);

export interface CreateNewProperties {
    onNewFolder: () => void;
    onNewDocument: () => void;
}


const CreateNew: React.FC<CreateNewProperties> = (properties) => {
    const classes = useStyles();

    const { onNewFolder, onNewDocument } = properties;

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <SpeedDial
            ariaLabel="Create New Actions"
            hidden={false}
            classes={{fab: classes.fab}}
            icon={<SpeedDialIcon/>}
            onClose={handleClose}
            onOpen={handleOpen}
            className={classes.speedDial}
            open={open}
            direction={'up'}
        >
            <SpeedDialAction
                key={'New Folder'}
                icon={<Icon>create_new_folder</Icon>}
                title={'New Folder'}
                tooltipTitle={'New Folder'}
                onClick={onNewFolder}
            />
            <SpeedDialAction
                key={'New File'}
                icon={<Icon>note_add</Icon>}
                title={'New File'}
                tooltipTitle={'New File'}
                onClick={onNewDocument}
            />
        </SpeedDial>
    );
};

export default CreateNew;
