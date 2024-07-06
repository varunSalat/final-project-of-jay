import { Box, Typography } from "@mui/material";
import React from "react";
import logo1 from "../../../../assets/logo1.png"

const SendMessageComponent = () => {
  return (
    <Box style={{ width: "100%" }}>
      <Box style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <Box
          style={{
            width: "50%",
            borderRadius: "15px 15px 0 15px",
            padding: "0.5rem",
            background: "#adb5bd",
          }}
        >
          <Typography>
            In this example, the .container class sets its height to 100vh,
            occupying the full height of the viewport. The .component class inside

          </Typography>
          <Box style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '0.5rem' }}>
            <Typography>03:45</Typography>
          </Box>
        </Box>
        <Box>
          <Box style={{ width: '40px', height: '40px', borderRadius: '50%', padding: '2px' }}>
            <img src={logo1} width="100%" height="100%" alt="logo" />
          </Box>
        </Box>
      </Box>

    </Box>
  )
}

export default SendMessageComponent
