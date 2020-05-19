import { Icon, IconButton, InputAdornment, TextField, TextFieldProps } from '@material-ui/core';
import React, { useState } from 'react';


const PasswordField: React.FC<TextFieldProps> = (props) => {
    const [visible, setVisible] = useState(false);
    return (
        <TextField
            type={visible ? 'text' : 'password'}
            {...props}
            InputProps={{
                endAdornment: <InputAdornment position="end">
                    <IconButton
                        onClick={() => setVisible(!visible)}
                        edge="end">
                        <Icon>{visible ? 'visibility' : 'visibility_off'}</Icon>
                    </IconButton>
                </InputAdornment>,
            }}
        />
    );
};

export default PasswordField;
