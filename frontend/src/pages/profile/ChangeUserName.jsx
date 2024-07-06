import React, { useState } from "react";
import { Box, Typography, TextField, useTheme, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useSnackbar } from 'notistack';

const ChangeUserName = ({ user, setIsEffect }) => {
    const { palette } = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const token = useSelector((state) => state.token);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);

    const handleChangeUserName = async () => {
        if (firstName === user.firstName && lastName === user.lastName) {
            return enqueueSnackbar('First name and last name must be different.', { variant: 'error' });
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/changeUserName`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
            }),
        });
        const data = await response.json();
        if (data.Message === "Success") {
            setIsEffect(true);
            return enqueueSnackbar('User name changed successfully', { variant: 'success' });
        } else {
            return enqueueSnackbar('Failed to change user name', { variant: 'error' });
        }
    }

    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem",
                borderRadius: "8px",
            }}
        >
            <Typography color={palette.neutral.dark} variant="h5" fontWeight="500">
                {`Change user name`}
            </Typography>
            <TextField
                fullWidth
                id="password"
                label="First Name"
                variant="outlined"
                value={firstName || ""}
                onChange={(event) => setFirstName(event.target.value)}
            />
            <TextField
                fullWidth
                id="password"
                label="Last Name"
                variant="outlined"
                value={lastName || ""}
                onChange={(event) => setLastName(event.target.value)}
            />
            <Button
                variant="contained"
                style={{ background: "red", color: "#ffff" }}
                onClick={handleChangeUserName}
            >
                Change
            </Button>
        </Box>
    );
};

export default ChangeUserName;
