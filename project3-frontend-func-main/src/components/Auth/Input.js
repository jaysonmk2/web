import React from 'react'
//import {TextField} from '@material-ui/core'
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword, defaultValue}) => (
    
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        defaultValue={defaultValue}
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        className="inputfield"
        InputProps={name ==='password' ?{
            endAdornment: (
                <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === 'password' ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
        }: null}
      />
    
  );
    
export default Input
