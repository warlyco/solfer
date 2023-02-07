import React, { FC, ReactNode, useCallback, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  BackpackWalletAdapter,
  Coin98WalletAdapter,
  ExodusWalletAdapter,
  GlowWalletAdapter,
  KeystoneWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SalmonWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  UnsafeBurnerWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { CLUSTER, RPC_ENDPOINT } from "constants/constants";
import showToast from "@/toasts/show-toast";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network =
    CLUSTER === "mainnet-beta"
      ? WalletAdapterNetwork.Mainnet
      : WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => RPC_ENDPOINT, []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
      new Coin98WalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new GlowWalletAdapter(),
      new BackpackWalletAdapter(),
      new SalmonWalletAdapter(),
      new ExodusWalletAdapter(),
      new KeystoneWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  const onError = useCallback((error: WalletError) => {
    showToast({
      primaryMessage: error.name,
      secondaryMessage: error.message,
    });
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint} config={{ commitment: "max" }}>
      <WalletProvider wallets={wallets} autoConnect onError={onError}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
