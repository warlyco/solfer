import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { useCallback, useEffect } from "react";

export const LitEncrypt = () => {
  const init = useCallback(async () => {
    const litNodeClient = new LitJsSdk.LitNodeClient({});
    await litNodeClient.connect();
    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: "ethereum",
    });
    console.log(authSig);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div>
      <h1>Lit Encrypt</h1>
    </div>
  );
};
