import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Folder, { CreateFolder } from '../../model/Folder';

export interface CreateNewFolderProperties {
    parent: Folder;
    onSave: (folder: CreateFolder) => void;
    onClose: () => void;
    open: boolean;
}

const CreateNewFolder: React.FC<CreateNewFolderProperties> = (properties) => {

    const { open, onSave, onClose, parent } = properties;

    const [name, setName] = useState('New Folder');

    const handleClose = () => {
        onClose();
    };

    const handleSave = () => {
        onSave({ name, parentId: parent.id });
    };

    const handleChange = (event: any) => {
        setName(event.target.value);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create new folder</DialogTitle>
                <DialogContent>
                    <TextField
                        value={name}
                        onChange={handleChange}
                        required
                        autoFocus
                        margin="dense"
                        id="new-folder-name"
                        label="Folder name"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" variant={'contained'}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateNewFolder;
