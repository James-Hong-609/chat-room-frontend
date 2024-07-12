import { Divider, IconButton, Stack } from "@mui/material";
import { GoogleLogo } from "phosphor-react";
import { useGoogleLogin } from "@react-oauth/google";

import { useDispatch } from "react-redux";
import {
  GoogleLogin,
} from "../../redux/slices/actions/authActions";

// import { getOAuthCode } from "../../utils/socialLoginHelpers";
// import Iconify from "../../components/Iconify";
import { ShowSnackbar } from "../../redux/slices/userSlice";

const AuthSocial = () => {
  const dispatch = useDispatch();

  // const baseURL = window.location.origin;

  // ---------- inner functions ----------

  const showSnackbar = (socialType) => {
    dispatch(
      ShowSnackbar({
        severity: "error",
        message: `Unable to login using ${socialType}`,
      })
    );
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(GoogleLogin(tokenResponse));
    },
    onError: (error) => {
      showSnackbar("google");
      console.log(error);
    },
  });

  // -------------------------------------

  return (
    <>
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
        }}
      >
        OR
      </Divider>
      <Stack direction={"row"} spacing={2} justifyContent={"center"}>
        <IconButton onClick={() => googleLogin()}>
          <GoogleLogo color="#DF3E30" />
        </IconButton>
      </Stack>
    </>
  );
};

export default AuthSocial;
