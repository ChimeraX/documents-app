import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Folder, { SubFolder } from '../../model/Folder';
import { Card, CardHeader, Grid, Icon, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            margin: '10px 0px 10px',
            backgroundColor: 'transparent'
        },
        item: {
            margin: '10px 0px 10px',
            backgroundColor: 'transparent',
        },
        paper: {
            backgroundColor: theme.palette.primary.dark,
            '&:hover': {
                backgroundColor: theme.palette.primary.main,
            },
        },
        icon: {
            color: 'white',
        },
    }),
);

export interface FolderListProperties {
    folder?: Folder;
    onClick: (folder: SubFolder) => void;
}

const FolderList: React.FC<FolderListProperties> = (properties) => {
    const { onClick, folder } = properties;
    const classes = useStyles();

    if (folder === undefined) {
        return null;
    }
    const { subFolders } = folder;

    const renderFolder = (folder: SubFolder) => (
        <Grid item xs={4} md={3}
              key={`folder-${folder.id}`}
              onDoubleClick={() => onClick(folder)}
              className={classes.item}>
            <Card className={classes.paper}>
                <CardHeader
                    avatar={
                        <Icon
                            className={classes.icon}>
                            folder
                        </Icon>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <Icon>more_vert</Icon>
                        </IconButton>
                    }
                    title={folder.name}
                    subheader={`${folder.documents} files, ${folder.subFolders} folders`}
                />
            </Card>
        </Grid>
    );

    return (

        <Grid spacing={3} container className={classes.root}>
            {
                subFolders.map(renderFolder)
            }
        </Grid>
    );
};

export default FolderList;
