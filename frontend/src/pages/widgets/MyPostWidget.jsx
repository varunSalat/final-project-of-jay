import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { setPosts } from "../../state";
import { useSnackbar } from "notistack";

const MyPostWidget = ({ picturePath }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [fileSelect, setFileSelect] = useState(null);

  const dispatch = useDispatch();

  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setIsImage(false);
    setPost("");
    enqueueSnackbar("posted successfully", { variant: "success" });
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles={
              fileSelect === "Image"
                ? [".jpg", ".jpeg", ".png", ".gif"]
                : fileSelect === "Video"
                  ? [".mp4", ".avi", ".mov", ".mkv"]
                  : fileSelect === "Attachment"
                    ? [".pdf", ".doc", ".docx", ".txt"]
                    : fileSelect === "Audio"
                      ? [".mp3", ".wav", ".ogg", ".flac"]
                      : []
            }
            accept={
              fileSelect === "Image"
                ? "image/jpeg, image/png, image/gif"
                : fileSelect === "Video"
                  ? "video/*"
                  : fileSelect === "Attachment"
                    ? ".pdf,.doc,.docx,.txt"
                    : fileSelect === "Audio"
                      ? "audio/*"
                      : ""
            }
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
                  sx={{ cursor: "pointer" }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <>
                      {fileSelect === "Image" && <p>Add image Here</p>}
                      {fileSelect === "Video" && <p>Add video Here</p>}
                      {fileSelect === "Attachment" && <p>Add file Here</p>}
                      {fileSelect === "Audio" && <p>Add audio Here</p>}
                    </>
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
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween
          gap="0.25rem"
          onClick={() => {
            setFileSelect("Image");
            setIsImage(!isImage);
          }}
        >
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ cursor: "pointer", color: medium }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween
              gap="0.25rem"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setFileSelect("Video");
                setIsImage(!isImage);
              }}
            >
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween
              gap="0.25rem"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setFileSelect("Attachment");
                setIsImage(!isImage);
              }}
            >
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween
              gap="0.25rem"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setFileSelect("Audio");
                setIsImage(!isImage);
              }}
            >
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        <button
          disabled={!post}
          style={{
            background: "#00509d",
            border: "none",
            padding: "0.5rem",
            borderRadius: "8px",
            color: "#ffff",
            width: "80px",
          }}
          onClick={handlePost}
        >
          Post
        </button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
