import React, { useState } from "react";
import { Box, Typography, useTheme, Button, IconButton } from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";

const ChangeProfileImage = ({ setIsEffect }) => {
  const { palette } = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState(null);
  const token = useSelector((state) => state.token);

  const handleProfileImageChange = async () => {
    const formData = new FormData();
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/changeProfileImage`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const posts = await response.json();
    if (posts.Message === "Success") {
      setImage(null);
      setIsEffect(true);
      return enqueueSnackbar('Profile image changed successfully', { variant: 'success' });
    } else {
      return enqueueSnackbar('Failed to change user name', { variant: 'error' });
    }
  };

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
      <Box
        gridColumn="span 4"
        border={`1px  solid ${palette.neutral.medium}`}
        borderRadius="5px"
        p="1rem"
      >
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <FlexBetween>
              <Box
                {...getRootProps()}
                border={`2px dashed ${palette.primary.main}`}
                p="1rem"
                width="100%"
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <input {...getInputProps()} />
                {!image ? (
                  <p>Add image Here</p>
                ) : (
                  <FlexBetween>
                    <Typography>{image.name}</Typography>
                    <EditOutlined />
                  </FlexBetween>
                )}
              </Box>
              {image && (
                <IconButton
                  onClick={() => setImage(null)}
                  sx={{ marginLeft: "10px" }}
                >
                  <DeleteOutlined />
                </IconButton>
              )}
            </FlexBetween>
          )}
        </Dropzone>
      </Box>
      <Box>
        <Button
          fullWidth
          variant="contained"
          style={{ background: "red", color: "#ffff", textTransform: 'none' }}
          onClick={handleProfileImageChange}
        >
          Change Profile Image
        </Button>
      </Box>
    </Box>
  );
};

export default ChangeProfileImage;
