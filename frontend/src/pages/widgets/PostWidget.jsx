import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
  TextField,
  Button,
} from "@mui/material";
import FlexBetween from "./../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "./../../components/WidgetWrapper";
import { setPost } from "../../state/index";
import UserImage from "../../components/UserImage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import ReactPlayer from "react-player";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  isEffect,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isComments, setIsComments] = useState(false);
  const [isViewReply, setIsViewReply] = useState({});
  const [isReply, setIsReply] = useState({});
  const [comment, setComment] = useState(null);
  const [allComments, setAllComments] = useState(null);
  const [commentReply, setCommentReply] = useState(null);
  const [isEditComment, setIsEditComment] = useState({
    index: 0,
    status: false,
    commentId: "",
    comment: "",
  });
  const [isEditReplyComment, setIsEditReplyComment] = useState({
    index: 0,
    status: false,
    commentId: "",
    commentReplyId: "",
    comment: "",
  });

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPauseIcon, setShowPauseIcon] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setShowPauseIcon(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
      if (video.currentTime > 2) {
        setShowPauseIcon(false);
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoRef]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const patchLike = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else {
        alert("Web Share API is not supported in this browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const toggleReplyVisibility = (index) => {
    setIsViewReply((prevVisibility) => ({
      ...prevVisibility,
      [index]: !prevVisibility[index],
    }));
  };

  const toggleReplyFormVisibility = (index) => {
    setIsReply((prevVisibility) => ({
      ...prevVisibility,
      [index]: !prevVisibility[index],
    }));
  };

  const getComments = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/getComments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
      }),
    });
    const responseData = await response.json();
    if (Array.isArray(responseData)) {
      const reversedData = responseData.slice().reverse();
      setAllComments(reversedData);
    }
  }, [token, postId]);

  useEffect(() => {
    void getComments();
  }, [getComments]);

  const sendComment = async () => {
    const URL = `${process.env.REACT_APP_API_URL}/posts/sendComment`;
    if (comment) {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          comment: comment,
        }),
      });
      const updatedPost = await response.json();
      void getComments();
      updatedPost && setComment(null);
    }
  };
  const sendCommentReply = async (commentId, i) => {
    if (commentReply) {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/sendCommentReply`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: postId,
            commentId: commentId,
            commentReply: commentReply,
          }),
        }
      );

      const updatedReply = await response.json();
      void getComments();
      updatedReply && setCommentReply(null);
      toggleReplyFormVisibility(i);
      if (!isViewReply[i]) {
        toggleReplyVisibility(i);
      }
    }
  };
  const editCommentClick = async () => {
    if (isEditComment.comment) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/editComment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          commentId: isEditComment.commentId,
          newComment: isEditComment.comment,
        }),
      });
      const updatedPost = await response.json();
      void getComments();
      updatedPost &&
        setIsEditComment({
          index: 0,
          status: false,
          commentId: "",
          comment: "",
        });
      enqueueSnackbar("Comment is updated successfully", {
        variant: "success",
      });
    }
  };
  const deleteCommentClick = async (commentId) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/deleteComment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        commentId: commentId,
      }),
    });
    const updatedPost = await response.json();
    void getComments();
    updatedPost &&
      enqueueSnackbar("Comment is deleted successfully", {
        variant: "success",
      });
  };
  const editReplyCommentClick = async () => {
    if (isEditReplyComment.comment) {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/editReplyComment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: postId,
            commentId: isEditReplyComment.commentId,
            commentReplyId: isEditReplyComment.commentReplyId,
            newComment: isEditReplyComment.comment,
          }),
        }
      );
      const updatedPost = await response.json();
      void getComments();
      updatedPost &&
        setIsEditReplyComment({
          index: 0,
          status: false,
          commentId: "",
          commentReplyId: "",
          comment: "",
        });
      enqueueSnackbar("Replied is updated successfully", {
        variant: "success",
      });
    }
  };
  const deleteReplyCommentClick = async (commentId, commentReplyId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/deleteReplyComment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          commentId: commentId,
          commentReplyId: commentReplyId,
        }),
      }
    );
    const updatedPost = await response.json();
    void getComments();
    updatedPost &&
      enqueueSnackbar("Replied is deleted successfully", {
        variant: "success",
      });
  };
  const preventContextMenu = (event) => {
    event.preventDefault();
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        isEffect={isEffect}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      {picturePath && (
        <>
          {[".png", ".jpg", ".jpeg", ".svg", ".gif"].some((ext) =>
            picturePath.endsWith(ext)
          ) && (
              <img
                width="100%"
                alt="post"
                style={{
                  borderRadius: "0.75rem",
                  marginTop: "0.75rem",
                  maxHeight: "fit-content",
                  maxWidth: "100%",
                }}
                src={`${process.env.REACT_APP_API_URL}/assets/${picturePath}`}
              />
            )}

          {[".mp4", ".avi", ".mov", ".wmv", ".mkv"].some((ext) =>
            picturePath.endsWith(ext)
          ) && (
              <div style={{ position: "relative" }}>
                <video
                  ref={videoRef}
                  controls
                  width="100%"
                  style={{
                    borderRadius: "0.75rem",
                    marginTop: "0.75rem",
                    maxHeight: "fit-content",
                    maxWidth: "100%",
                  }}
                >
                  <source src={`${process.env.REACT_APP_API_URL}/assets/${picturePath}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {showPauseIcon && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      cursor: "pointer",
                    }}
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M5 3h3v18H5V3zm11 0h3v18h-3V3z" />
                        <path fill="none" d="M0 0h24v24H0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M8 5v14l11-7z" />
                        <path fill="none" d="M0 0h24v24H0z" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
            )}

          {[".mp3", ".ogg", ".wav"].some((ext) => picturePath.endsWith(ext)) && (
            <audio controls style={{ marginTop: "0.75rem", width: "100%" }}>
              <source
                src={`${process.env.REACT_APP_API_URL}/assets/${picturePath}`}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          )}

          {[".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".csv"].some((ext) =>
            picturePath.endsWith(ext)
          ) && (
              <embed
                src={`${process.env.REACT_APP_API_URL}/assets/${picturePath}`}
                type="application/pdf"
                width="100%"
                height="500px"
              />
            )}
        </>
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <Tooltip title="Like">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
            </Tooltip>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <Tooltip title="Comment">
              <IconButton onClick={() => setIsComments((preview) => !preview)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
            </Tooltip>
            <Typography>{allComments?.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined onClick={handleShare} />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <Box
            style={{
              width: "100%",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Write a comment here..."
              variant="standard"
              onChange={(event) => {
                if (isEditComment.status) {
                  setIsEditComment((prevState) => ({
                    ...prevState,
                    comment: event.target.value,
                  }));
                } else {
                  setComment(event.target.value);
                }
              }}
              value={
                isEditComment.status ? isEditComment.comment : comment || ""
              }
            />
            {isEditComment.status ? (
              <Button
                variant="contained"
                style={{ background: "#1e96fc", color: "#ffff", textTransform: 'none' }}
                onClick={editCommentClick}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{ background: "#1e96fc", color: "#ffff", textTransform: 'none' }}
                onClick={sendComment}
              >
                Comment
              </Button>
            )}
          </Box>
          {allComments.map((comment, i) => {
            return (
              <>
                {allComments.length !== 0 && (
                  <Box key={i} style={{ marginTop: "1rem" }}>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <UserImage
                        image={comment.userId.picturePath}
                        size="20px"
                      />
                      <Typography
                        color={main}
                        variant="h5"
                        sx={{
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        {`${comment.userId.firstName} ${comment.userId.lastName}`}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "start",
                        gap: "0.5rem",
                        marginLeft: "1.8rem",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Typography
                          color={main}
                          variant="h5"
                          sx={{
                            cursor: "pointer",
                            width: "100%",
                          }}
                        >
                          {comment.comment}
                        </Typography>

                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          {comment.userId._id === loggedInUserId && (
                            <EditIcon
                              onClick={() =>
                                setIsEditComment({
                                  index: i,
                                  status: true,
                                  commentId: comment._id,
                                  comment: comment.comment,
                                })
                              }
                              style={{ cursor: "pointer" }}
                            />
                          )}
                          {(comment.userId._id === loggedInUserId ||
                            postUserId === loggedInUserId) && (
                              <DeleteIcon
                                onClick={() => deleteCommentClick(comment._id)}
                                style={{ cursor: "pointer" }}
                              />
                            )}
                        </Box>
                      </Box>
                      {isViewReply[i] && comment.commentReply.length !== 0 && (
                        <>
                          <Divider />
                          <Box style={{ width: "100%" }}>
                            {comment.commentReply
                              .slice()
                              .reverse()
                              .map((replyComment, i) => {
                                return (
                                  <>
                                    <Box key={i}>
                                      <Box
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "0.5rem",
                                        }}
                                      >
                                        <UserImage
                                          image={
                                            replyComment.userId.picturePath
                                          }
                                          size="20px"
                                        />
                                        <Typography
                                          color={main}
                                          variant="h5"
                                          sx={{
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {`${replyComment.userId.firstName} ${replyComment.userId.lastName}`}
                                        </Typography>
                                      </Box>
                                      <Box
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          justifyContent: "space-between",
                                          alignItems: "start",
                                          gap: "0.5rem",
                                          marginLeft: "1.8rem",
                                        }}
                                      >
                                        <Typography
                                          color={main}
                                          variant="h5"
                                          sx={{
                                            cursor: "pointer",
                                            width: "100%",
                                          }}
                                        >
                                          {replyComment.comment}
                                        </Typography>
                                        <Box
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1rem",
                                          }}
                                        >
                                          {replyComment.userId._id ===
                                            loggedInUserId && (
                                              <EditIcon
                                                onClick={() => {
                                                  setIsEditReplyComment({
                                                    index: i,
                                                    status: true,
                                                    commentId: comment._id,
                                                    commentReplyId:
                                                      replyComment._id,
                                                    comment: replyComment.comment,
                                                  });
                                                }}
                                                style={{ cursor: "pointer" }}
                                              />
                                            )}
                                          {(replyComment.userId._id ===
                                            loggedInUserId ||
                                            postUserId === loggedInUserId) && (
                                              <DeleteIcon
                                                onClick={() =>
                                                  deleteReplyCommentClick(
                                                    comment._id,
                                                    replyComment._id
                                                  )
                                                }
                                                style={{ cursor: "pointer" }}
                                              />
                                            )}
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Divider fullWidth />
                                  </>
                                );
                              })}
                          </Box>
                        </>
                      )}
                      <Box
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "2rem",
                          width: "100%",
                          marginTop: "1rem",
                        }}
                      >
                        {!isReply[i] && (
                          <>
                            <Typography
                              color={main}
                              variant="h5"
                              sx={{
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                toggleReplyVisibility(i);
                                setIsEditReplyComment({
                                  index: i,
                                  status: false,
                                  commentId: "",
                                  commentReplyId: "",
                                  comment: "",
                                });
                              }}
                            >
                              {`View Reply`}
                            </Typography>
                            <Typography
                              color={main}
                              variant="h5"
                              sx={{
                                cursor: "pointer",
                                color: "blue",
                              }}
                              onClick={() => toggleReplyFormVisibility(i)}
                            >
                              {`Reply`}
                            </Typography>
                          </>
                        )}

                        {isReply[i] && (
                          <Box
                            style={{
                              width: "100%",
                              display: "flex",
                              gap: "1rem",
                              alignItems: "center",
                            }}
                          >
                            <TextField
                              fullWidth
                              id="outlined-basic"
                              label="Write a comment here..."
                              variant="standard"
                              value={commentReply || ""}
                              onChange={(event) =>
                                setCommentReply(event.target.value)
                              }
                            />
                            <Button
                              variant="contained"
                              style={{ background: "#1e96fc", color: "#ffff", textTransform: 'none' }}
                              onClick={() => sendCommentReply(comment._id, i)}
                            >
                              Reply
                            </Button>
                          </Box>
                        )}

                        {isEditReplyComment.status && (
                          <Box
                            style={{
                              width: "100%",
                              display: "flex",
                              gap: "1rem",
                              alignItems: "center",
                            }}
                          >
                            <TextField
                              fullWidth
                              id="outlined-basic"
                              label="Write a comment here..."
                              variant="standard"
                              value={isEditReplyComment.comment || ""}
                              onChange={(event) =>
                                setIsEditReplyComment((prevState) => ({
                                  ...prevState,
                                  comment: event.target.value,
                                }))
                              }
                            />
                            <Button
                              variant="contained"
                              style={{ background: "#1e96fc", color: "#ffff", textTransform: 'none' }}
                              onClick={editReplyCommentClick}
                            >
                              Reply
                            </Button>
                          </Box>
                        )}
                        <Divider />
                      </Box>
                    </Box>
                  </Box>
                )}
                <Divider />
              </>
            );
          })}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
