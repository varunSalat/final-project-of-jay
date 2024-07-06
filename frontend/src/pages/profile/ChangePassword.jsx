import React, { useState } from 'react';
import { Box, Typography, TextField, useTheme, Button, InputAdornment } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSnackbar } from 'notistack';

const ChangePassword = ({ token }) => {
    const { palette } = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const [isVisibleOldPassword, setIsVisibleOldPassword] = useState(false);
    const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(false);
    const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const changePassword = async () => {
        if (newPassword !== confirmPassword) {
            enqueueSnackbar('New password is not matched with confirm password', { variant: 'error' })
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/changePassword`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                oldPassword: oldPassword,
                newPassword: newPassword
            })
        });
        const data = await response.json();
        if (data.Message === "Success") {
            enqueueSnackbar('Password changed successfully', { variant: 'success' });
            setOldPassword(null);
            setNewPassword(null);
            setConfirmPassword(null);
        } else {
            enqueueSnackbar('Failed to change password', { variant: 'error' });
            setOldPassword(null);
            setNewPassword(null);
            setConfirmPassword(null);
        }
    }

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', borderRadius: '8px' }}>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
            >
                Password Change
            </Typography>
            <TextField
                fullWidth
                id="password"
                label="Old Password"
                variant="outlined"
                type={isVisibleOldPassword ? "text" : "password"}
                value={oldPassword || ''}
                onChange={(event) => setOldPassword(event.target.value)}
                InputProps={{
                    endAdornment: <InputAdornment position="start">
                        {isVisibleOldPassword ?
                            <VisibilityIcon style={{ cursor: 'pointer' }} onClick={() => setIsVisibleOldPassword(false)} />
                            :
                            <VisibilityOffIcon style={{ cursor: 'pointer' }} onClick={() => setIsVisibleOldPassword(true)} />
                        }
                    </InputAdornment>,
                }}
            />
            <TextField
                fullWidth
                id="password"
                label="New Password"
                variant="outlined"
                type={isVisibleNewPassword ? "text" : "password"}
                value={newPassword || ''}
                onChange={(event) => setNewPassword(event.target.value)}
                InputProps={{
                    endAdornment: <InputAdornment position="start">
                        {isVisibleNewPassword ?
                            <VisibilityIcon style={{ cursor: 'pointer' }} onClick={() => setIsVisibleNewPassword(false)} />
                            :
                            <VisibilityOffIcon style={{ cursor: 'pointer' }} onClick={() => setIsVisibleNewPassword(true)} />
                        }
                    </InputAdornment>,
                }}
            />
            <TextField
                fullWidth
                id="cpassword"
                label="Confirm Password"
                variant="outlined"
                type={isVisibleConfirmPassword ? "text" : "password"}
                value={confirmPassword || ''}
                onChange={(event) => setConfirmPassword(event.target.value)}
                InputProps={{
                    endAdornment: <InputAdornment position="start">
                        {isVisibleConfirmPassword ?
                            <VisibilityIcon style={{ cursor: 'pointer' }} onClick={() => setIsVisibleConfirmPassword(false)} />
                            :
                            <VisibilityOffIcon style={{ cursor: 'pointer' }} onClick={() => setIsVisibleConfirmPassword(true)} />
                        }
                    </InputAdornment>,
                }}
            />
            <Button
                variant="contained"
                style={{
                    background: 'red',
                    color: '#ffff'
                }}
                onClick={changePassword}
            >Change</Button>
        </Box>
    )
}

export default ChangePassword;
