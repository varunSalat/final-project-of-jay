import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoCompleteTextField({ userList, value, setValue }) {
    const userlists = userList && userList.map((user) => ({
        userId: user._id,
        userName: `${user.firstName} ${user.lastName}`,
        firstName: user.firstName,
        lastName: user.lastName,
        picturePath: user.picturePath,
        occupation: user.occupation,
        email: user.email,
    }))
    return (
        <React.Fragment>
            <Autocomplete
                value={value}
                onChange={(event) => setValue(event.target.value)}
                style={{ borderRadius: '25px' }}
                id="free-solo-dialog-demo"
                options={userlists}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.userName;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => <li {...props}>{option.userName}</li>}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => <TextField {...params} label="Search new users..." />}
            />
        </React.Fragment>
    );
}