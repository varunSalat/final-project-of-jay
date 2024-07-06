import React from "react";
import { Box, Typography, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import PageviewIcon from "@mui/icons-material/Pageview";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

const ChannelMenu = ({ channelDetails, userId, isAdmin, setMenu, token, setIsRefresh }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    };
    const handleDeleteClose = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/channel/deleteChannel`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                channelId: channelDetails.channelId,
            }),
        });
        await response.json();
        navigate("/userlist");
        setIsRefresh((isRefresh) => !isRefresh);
        setDeleteOpen(false);
    };
    return (
        <Box>
            <Button
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{
                    textTransform: "none",
                    padding: "0.5rem",
                    display: "felx",
                    gap: "1rem",
                    alignItems: "center",
                }}
            >
                <MoreVertIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                {(channelDetails?.channelCreatedBy === userId || isAdmin) && (
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            setMenu("addMember");
                        }}
                        style={{ display: "flex", gap: "1rem" }}
                    >
                        <PersonAddIcon />
                        <Typography variant="body">{"Add Member"}</Typography>
                    </MenuItem>
                )}
                {(channelDetails?.channelCreatedBy === userId || isAdmin) && (
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            setMenu("editChannel");
                        }}
                        style={{ display: "flex", gap: "1rem" }}
                    >
                        <ModeEditOutlineIcon />
                        <Typography variant="body">{"Edit Channel"}</Typography>
                    </MenuItem>
                )}
                <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        setMenu("viewAdmin");
                    }}
                    style={{ display: "flex", gap: "1rem" }}
                >
                    <PageviewIcon />
                    <Typography variant="body">{"View Admins"}</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        setMenu("viewMember");
                    }}
                    style={{ display: "flex", gap: "1rem" }}
                >
                    <PageviewIcon />
                    <Typography variant="body">{"View Members"}</Typography>
                </MenuItem>
                {(channelDetails?.channelCreatedBy === userId || isAdmin) && (
                    <MenuItem
                        onClick={handleDeleteOpen}
                        style={{ display: "flex", gap: "1rem", color: "red" }}
                    >
                        <DeleteIcon />
                        <Typography>Delete Channel</Typography>
                    </MenuItem>
                )}
            </Menu>

            <Dialog
                open={deleteOpen}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {channelDetails?.channelName}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete this channel ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteClose} autoFocus style={{ background: 'red', color: '#ffff' }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default ChannelMenu;
