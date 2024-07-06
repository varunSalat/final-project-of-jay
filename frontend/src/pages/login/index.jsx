import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import logo1 from "../../assets/logo1.png";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          alt="Brand"
          src={logo1}
          sx={{ padding: "3px", width: "50px", height: "50px" }}
        />
      </Box>

      {/* FORM BOX */}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          display="flex"
          alignItems="center"
          variant="h5"
          sx={{ mb: "1.5rem" }}
        >
          Credential Information
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
