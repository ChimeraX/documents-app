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
                        onMouseDown={() => console.log('onMouseDown')}
                        edge="end">
                        {visible ? <Icon>visibility</Icon> : <Icon>visibility_off</Icon>}
                    </IconButton>
                </InputAdornment>,
            }}
        />
    );
};

export default PasswordField;
