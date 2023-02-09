import { LitEncrypt } from "@/features/lit-encrypt";
import ShadowUpload from "@/features/shadow-upload";
import { useState } from "react";
import { CheckmarkIcon } from "react-hot-toast";
import { BeakerIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { FileSelect } from "@/features/file-select";

export interface EncryptedData {
  encryptedFile: Blob;
  encryptedSymmetricKey: Uint8Array;
}

export default function Home() {
  const [messageToEncrypt, setMessageToEncrypt] = useState<string>("");
  const [encryptedData, setEncryptedData] = useState<EncryptedData | null>(
    null
  );
  const [file, setFile] = useState<File | undefined>(undefined);

  return (
    <>
      <main className="w-full min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <FileSelect setFile={setFile} />
          {!!file && (
            <LitEncrypt
              fileToEncrypt={file}
              setEncryptedData={setEncryptedData}
            />
          )}
          <ShadowUpload encryptedData={encryptedData} />
        </div>
      </main>
    </>
  );
}
