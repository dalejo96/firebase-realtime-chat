import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Base from "../../components/Base";

const Welcome = () => {
  return (
    <Base>
      <Box
        sx={{
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" gutterBottom>
            Welcome to the chat app
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            This app was made using the realtime database of Firebase and
            Material UI. Use the bar above to navigate through the app. Place
            your questions or comments in the general chat. Be gentle and
            identify yourself.
          </Typography>
          <img
            src="https://www.gstatic.com/devrel-devsite/prod/vdb149cdc08c87ab249cdebfec6395e8f073056d752ca9c2d285d3b8426fcfa32/firebase/images/lockup.svg"
            width={500}
            alt="Firebase Logo"
          />
        </Container>
      </Box>
    </Base>
  );
};

export default Welcome;
