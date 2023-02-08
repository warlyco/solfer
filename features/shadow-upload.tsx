import React, { useEffect, useState } from "react";
import { ShdwDrive } from "@shadow-drive/sdk";
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import FormData from "form-data";
import { EncryptedData } from "@/pages";

interface Props {
  encryptedData: EncryptedData | null;
}

export default function ShadowUpload({ encryptedData }: Props) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploadUrl, setUploadUrl] = useState<String | undefined>(undefined);
  const [txnSig, setTxnSig] = useState<String | undefined>(undefined);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const wallet = useAnchorWallet();

  // useEffect(() => {
  //   (async () => {
  //     if (wallet?.publicKey) {
  //       const drive = await new ShdwDrive(connection, wallet).init();
  //     }
  //   })();
  // }, [connection, wallet, wallet?.publicKey]);

  const handleSaveToShadowDrive = async (event: any) => {
    if (!publicKey || !encryptedData) return;
    event.preventDefault();
    const drive = await new ShdwDrive(
      connection,
      wallet as AnchorWallet
    ).init();
    const accounts = await drive.getStorageAccounts("v2");
    console.log(accounts);
    let account = accounts[0];
    console.log({ account });
    let newAccount;
    if (!account) {
      console.log("Creating new account");
      const accountName = String(encryptedData.encryptedSymmetricKey).slice(
        0,
        10
      );
      console.log({ accountName });
      newAccount = await drive.createStorageAccount("testAccount", "1MB", "v2");
      console.log({ newAccount });
    }
    // const getStorageAccount = await drive.getStorageAccount(account);
    // if (!file) return;
    // const upload = await drive.uploadFile(account, file, "v2");
    // console.log(upload);
    // setUploadUrl(upload.finalized_locations?.[0]);
    // setTxnSig(upload.transaction_signature);
  };

  const createTestAccount = async (event: any) => {
    if (!publicKey) return;
    event.preventDefault();
    const drive = await new ShdwDrive(
      connection,
      wallet as AnchorWallet
    ).init();
    try {
      const newAccount = await drive.createStorageAccount(
        "testAccount",
        "1MB",
        "v2"
      );
      console.log({ newAccount });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      {/* <form onSubmit={handleSaveToShadowDrive}>
        <h1>Shadow Drive File Upload</h1>
        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files?.[0] ? e.target.files[0] : undefined)
          }
        />
        <br />
        <button type="submit">Upload</button>
      </form> */}
      <button onClick={createTestAccount} className="uppercase">
        Create test account
      </button>
      {!!encryptedData && (
        <>
          <button onClick={handleSaveToShadowDrive} className="uppercase">
            Save to Shadow Drive
          </button>
          <div>
            {uploadUrl ? (
              <div>
                <h3>Success!</h3>
                <h4>URL: {uploadUrl}</h4>
                <h4>Sig: {txnSig}</h4>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
