import React, { useState } from 'react';
import Folder from '../../model/Folder';
import Document from '../../model/Document';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ChimeraXAppTheme from '../../theming/ChimeraXAppTheme';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Icon,
    IconButton,
} from '@material-ui/core';

const useStyles = makeStyles((theme: ChimeraXAppTheme) => {
    return createStyles({
        input: {
            display: 'none',
        },
        paper: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
            alignSelf: 'center',
        },
        dropzone: {
            height: '200px',
            width: '500px',
            border: 'black dashed',
            textAlign: 'center',
        },
    });
});


export interface CreateNewDocumentProperties {
    folder: Folder;
    onSave: (document: Document) => void;
    onClose: () => void;
    open: boolean;
}

const CreateNewDocument: React.FC<CreateNewDocumentProperties> = (properties) => {

    const { open, onSave, onClose, folder } = properties;

    const classes = useStyles();

    const [file, setFile] = useState<Document | undefined>(undefined);
    const [progress, setProgress] = useState<number | undefined>(undefined);

    const progressRequired = progress !== undefined && progress !== 100;

    const handleClose = () => {
        onClose();
        setFile(undefined);
        setProgress(undefined);
    };

    const handleSave = () => {
        file && onSave(file);
        setFile(undefined);
        setProgress(undefined);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProgress(0);
        const files: FileList = event.target.files!!;
        const inputFile = files[0];

        const { name, type, size } = inputFile;
        setFile({
            name, type, size, folderId: folder.id, data: '',
        });

        const reader = new FileReader();
        reader.readAsDataURL(inputFile);
        reader.onprogress = ev => {
            setProgress(100 * ev.loaded / ev.total);
        };
        reader.onload = () => {
            const data = `${reader.result}`;
            console.log(type);
            setFile({
                name, type, size, folderId: folder.id, data
            });
        };
    };

    return (
        <Dialog
            classes={{ paper: classes.paper }}
            color={'primary'}
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Upload a new file</DialogTitle>
            <DialogContent>
                <input
                    accept="*/*"
                    className={classes.input}
                    id="upload-file-input"
                    type="file"
                    onChange={handleChange}
                />
                <label htmlFor="upload-file-input">
                    <IconButton color={'primary'} component={'span'}>
                        <Icon>backup</Icon>
                    </IconButton>
                </label>
                {file ? file.name : 'Select a file'}
                {progressRequired ? <CircularProgress variant={'determinate'} value={progress}/> : null}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" variant={'contained'}>
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateNewDocument;
