import { EncryptedData } from "@/pages";
import { JsonAuthSig } from "@lit-protocol/constants";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { useCallback, useEffect, useMemo, useState } from "react";

const chain = "solana";

const accessControlConditions = [
  {
    method: "",
    params: [":userAddress"],
    pdaParams: [],
    pdaInterface: { offset: 0, fields: {} },
    pdaKey: "",
    chain,
    returnValueTest: {
      key: "",
      comparator: "=",
      value: "44Cv2k5kFRzGQwBLEBc6aHHTwTvEReyeh4PHMH1cBgAe",
    },
  },
];

interface Props {
  messageToEncrypt: string;
  setEncryptedData: (data: EncryptedData) => void;
}

export const LitEncrypt = ({ messageToEncrypt, setEncryptedData }: Props) => {
  const [client, setClient] = useState<any>(null);
  const [signature, setSignature] = useState<JsonAuthSig | null>(null);

  const initLitClient = useCallback(async () => {
    // @ts-ignore
    const client = new LitJsSdk.LitNodeClient();
    await client.connect();
    setClient(client);
  }, []);

  const getSignature = useCallback(async () => {
    if (!client) return;
    console.log("getSignature");
    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: "solana",
    });
    setSignature(authSig);
  }, [client]);

  const encrypt = useCallback(async () => {
    if (!signature) return;

    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
      messageToEncrypt
    );

    const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig: signature,
      chain,
    });

    console.log({
      encryptedString,
      encryptedSymmetricKey,
    });
    setEncryptedData({
      encryptedString,
      encryptedSymmetricKey,
    });
  }, [messageToEncrypt, setEncryptedData, signature]);

  useEffect(() => {
    if (!client) {
      initLitClient();
      return;
    }

    if (!signature) {
      getSignature();
      return;
    }
  }, [getSignature, initLitClient, client, signature, encrypt]);

  return (
    <div>
      <button onClick={encrypt} className="uppercase">
        Encrypt
      </button>
    </div>
  );
};
