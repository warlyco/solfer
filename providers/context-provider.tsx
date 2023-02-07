import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { deepPurple, pink } from "@mui/material/colors";
import { SnackbarProvider } from "notistack";
import { FC, ReactNode } from "react";
// import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import client from "graphql/apollo/client";
import showToast from "toasts/show-toast";
import { WalletContextProvider } from "@/providers/wallet-context-provider";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: deepPurple[700],
    },
    secondary: {
      main: pink[700],
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          justifyContent: "flex-start",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "12px 16px",
        },
        startIcon: {
          marginRight: 8,
        },
        endIcon: {
          marginLeft: 8,
        },
      },
    },
  },
});

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {/* <Provider store={store}> */}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <WalletContextProvider>{children}</WalletContextProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </StyledEngineProvider>
      {/* </Provider> */}
    </ApolloProvider>
  );
};
