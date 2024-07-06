import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useTheme,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import { useSnackbar } from "notistack";

const CreateChannelForm = ({ setIsRefresh }) => {
  const { palette } = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);
  const [image, setImage] = useState(null);
  const [channelName, setChannelName] = useState(null);
  const [channelDescription, setChannelDescription] = useState(null);
  const [channelType, setChannelType] = useState(false);

  const handleSubmitChannel = async () => {
    const wordCount =
      channelDescription && channelDescription.trim().split(/\s+/).length;
    if (!channelName) {
      return enqueueSnackbar("Please enter the channel name", { variant: "error" });
    }
    if (!channelDescription) {
      return enqueueSnackbar("Please enter the channel description", {
        variant: "error",
      });
    }
    if (wordCount < 10) {
      return enqueueSnackbar("Description should be greater than 10 words.", {
        variant: "error",
      });
    }
    if (wordCount > 20) {
      return enqueueSnackbar("Description should be less than 20 words.", {
        variant: "error",
      });
    }
    // const formData = new FormData();
    // formData.append("channelName", channelName);
    // formData.append("channelDescription", channelDescription);
    // formData.append("privateChannel", channelType);
    // if (image) {
    //   formData.append("picture", image);
    //   formData.append("channelImage", image.name);
    // }
    await fetch(`${process.env.REACT_APP_API_URL}/channel`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channelName: channelName,
        channelDescription: channelDescription,
        privateChannel: channelType,
      }),
    })
      .then(() => {
        setIsRefresh(true);
        setChannelType(null);
        setChannelName(null);
        setChannelType(false);
        enqueueSnackbar("Channel Created Successfull", { variant: "success" });
      })
      .catch(() => {
        setChannelType(null);
        setChannelName(null);
        setChannelType(false);
        enqueueSnackbar("Something went wrong", { variant: "error" });
      });
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
      }}
    >
      <TextField
        fullWidth
        id="outlined-basic"
        label="Channel name"
        variant="outlined"
        value={channelName || ""}
        onChange={(event) => setChannelName(event.target.value)}
      />
      <TextField
        fullWidth
        id="outlined-basic"
        label="Channel description"
        variant="outlined"
        multiline
        rows={4}
        value={channelDescription || ""}
        onChange={(event) => setChannelDescription(event.target.value)}
      />
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={channelType}
        name="radio-buttons-group"
        onChange={(event) => setChannelType(event.target.value)}
      >
        <FormControlLabel
          value={false}
          control={<Radio />}
          label="Public channel"
        />
        <FormControlLabel
          value={true}
          control={<Radio />}
          label="Private channel"
        />
      </RadioGroup>
      {/* <Dropzone
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
      </Dropzone> */}
      <Button
        variant="contained"
        color="primary"
        style={{ textTransform: "none" }}
        onClick={handleSubmitChannel}
      >
        Create channel
      </Button>
    </Box>
  );
};

export default CreateChannelForm;
