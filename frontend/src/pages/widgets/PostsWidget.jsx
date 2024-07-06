import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPosts } from "../../state/index";
import PostWidget from "./PostWidget";
import Scrollbars from "react-custom-scrollbars-2";
import { useMediaQuery } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false, isEffect }) => {
  const scrollbarsRef = useRef(null);
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isEffect]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isNonMobileScreens ? <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        ref={scrollbarsRef}
        style={{ padding: '1rem', marginTop: '1rem' }}
      >
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.slice().reverse().map(
            ({
              _id,
              userId,
              firstName,
              lastName,
              description,
              location,
              picturePath,
              userPicturePath,
              likes,
              comments,
            }) => (
              <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
                isEffect={isEffect}
              />
            )
          )
        ) : (
          <p>No posts found</p>
        )}
      </Scrollbars> : <>{Array.isArray(posts) && posts.length > 0 ? (
        posts.slice().reverse().map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              isEffect={isEffect}
            />
          )
        )
      ) : (
        <p>No posts found</p>
      )}</>}

    </>
  );
};

export default PostsWidget;
