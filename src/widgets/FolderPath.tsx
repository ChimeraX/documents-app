import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import React from 'react';
import { SubFolder } from '../model/Folder';
import { makeStyles } from '@material-ui/core/styles';
import ChimeraXAppTheme from '../theming/ChimeraXAppTheme';
import { createStyles } from '@material-ui/core';

export interface FolderPathProperties {
    folders: SubFolder[];
    onClick: (folder: SubFolder) => void;
    onClear: () => void;
}


const useStyles = makeStyles((theme: ChimeraXAppTheme) => createStyles({
    link: {
        cursor: 'pointer',
        fontSize: '20px',
    },
}));


const FolderPath: React.FC<FolderPathProperties> = (properties) => {

    const { folders, onClick, onClear } = properties;

    const classes = useStyles();

    return (
        <Breadcrumbs>
            <Link
                key={'link-home'}
                color={'textPrimary'}
                className={classes.link}
                onClick={onClear}>
                Home
            </Link>
            {folders.map(folder => {
                return (
                    <Link
                        key={`link-${folder.id}`}
                        className={classes.link}
                        onClick={() => onClick(folder)}>{folder.name}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default FolderPath;
