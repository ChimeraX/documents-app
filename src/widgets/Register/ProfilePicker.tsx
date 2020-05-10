import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Icon } from '@material-ui/core';
import ChimeraXAppTheme from '../../theming/ChimeraXAppTheme';
import Document from '../../model/Document';

const useStyles = makeStyles((theme: ChimeraXAppTheme) => {
    return createStyles({
        root: {
            display: 'flex',
        },
        wrapper: {
            margin: 0,
            padding: 0,
            position: 'relative',
            left: '50%',
            transform: 'translate(-50%, 0)'
        },
        profilePicture: {
            height: '160px',
            width: '160px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '50%',
        },
        input: {
            display: 'none',
        },
        icon: {
            fontSize: '60px',
        },
    });
});

export interface ProfilePickerProperties {
    onUpload: (document: Document) => void;
}


const ProfilePicker: React.FC<ProfilePickerProperties> = (properties) => {

    const { onUpload } = properties;

    const classes = useStyles();

    const [picture, setPicture] = useState<Document | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList = event.target.files!!;
        const file = files[0];

        const { name, type, size } = file;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const data = `${reader.result}`;
            setPicture({
                name, type, size, data,
            });
            onUpload(picture!!);
        };
    };

    const ProfileImage = () => {
        return (
            <img
                src={picture?.data}
                alt={picture?.name}
                unselectable={'on'}
                draggable={false}
                className={classes.profilePicture}
            />
        );
    };

    const ProfileSelector = () => {
        return (
            <div>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={handleChange}
                />
                <label htmlFor="contained-button-file">
                    <Button
                        variant="contained"
                        color={'primary'}
                        component="span"
                        startIcon={<Icon>portrait</Icon>}
                    >
                        Choose
                    </Button>
                </label>
            </div>
        );
    };
    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                {picture ? <ProfileImage/> : <ProfileSelector/>}
            </div>
        </div>
    );
};

export default ProfilePicker;
