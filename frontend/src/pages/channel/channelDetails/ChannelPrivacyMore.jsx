import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import privacy from "../../../assets/privacy.png";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import Person3Icon from "@mui/icons-material/Person3";

const ChannelPrivacyMore = ({ privacyOpen, setPrivacyOpen }) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box>
            <Dialog
                open={privacyOpen}
                onClose={() => setPrivacyOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent
                    id="alert-dialog-title"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={privacy}
                        alt=""
                        width={isNonMobileScreens ? "300px" : "100%"}
                        height="100%"
                    />
                </DialogContent>
                <DialogTitle
                    id="alert-dialog-title"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        Enhanced privacy has been implemented for your profile.
                    </Typography>
                </DialogTitle>
                <DialogContent
                    style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                >
                    <Box
                        style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <VisibilityOffIcon />
                        </Box>
                        <Box>
                            <Typography style={{ fontWeight: "bold" }}>
                                You're not visible to other followers
                            </Typography>
                            <Typography>
                                Followers are unable to see when you follow or interact within
                                the channel.
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <EmailIcon />
                        </Box>
                        <Box>
                            <Typography style={{ fontWeight: "bold" }}>
                                Your email address is protected
                            </Typography>
                            <Typography>
                                Administrators are unable to see your email address unless they
                                have saved you as a contact.
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Person3Icon />
                        </Box>
                        <Box>
                            <Typography style={{ fontWeight: "bold" }}>
                                Admins can see your profile name
                            </Typography>
                            <Typography>
                                Administrators may also view your profile photo based on your
                                privacy settings.
                            </Typography>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions style={{ padding: "2rem" }}>
                    <Button
                        fullWidth
                        variant="contained"
                        style={{
                            background: "#48bfe3",
                            color: "#ffff",
                            borderRadius: "15px",
                            textTransform: "none",
                        }}
                        onClick={() => setPrivacyOpen(false)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ChannelPrivacyMore;
