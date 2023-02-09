import Spinner from "@/features/UI/spinner";
import { EncryptedData } from "@/pages";
import { LockClosedIcon } from "@heroicons/react/24/solid";
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
  fileToEncrypt: File;
  setEncryptedData: (data: EncryptedData) => void;
}

export const LitEncrypt = ({ fileToEncrypt, setEncryptedData }: Props) => {
  const [client, setClient] = useState<any>(null);
  const [signature, setSignature] = useState<JsonAuthSig | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(true);

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
    if (!signature || !fileToEncrypt) return;
    setIsEncrypting(true);

    const encryptedFileRes = await LitJsSdk.encryptFile({
      file: fileToEncrypt,
    });

    if (!encryptedFileRes) return;

    const { encryptedFile, symmetricKey } = encryptedFileRes;

    const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
      accessControlConditions,
      // @ts-ignore
      symmetricKey,
      authSig: signature,
      chain,
    });

    console.log({
      encryptedFile,
      encryptedSymmetricKey,
    });
    setEncryptedData({
      encryptedFile,
      encryptedSymmetricKey,
    });
    setIsEncrypting(false);
  }, [fileToEncrypt, setEncryptedData, signature]);

  useEffect(() => {
    if (!client) {
      initLitClient();
      return;
    }

    if (!signature) {
      getSignature();
      return;
    }

    if (!fileToEncrypt) return;
    encrypt();
  }, [getSignature, initLitClient, client, signature, encrypt, fileToEncrypt]);

  return (
    <div className="py-8">
      {isEncrypting ? (
        <div className="flex space-x-2">
          <Spinner />
          <div>Encrypting</div>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <LockClosedIcon className="w-6 h-6 text-green-500" />
          <div>Data Encrypted</div>
        </div>
      )}
    </div>
  );
};
