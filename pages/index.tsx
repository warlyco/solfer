import { LitEncrypt } from "@/features/lit-encrypt";
import ShadowUpload from "@/features/shadow-upload";
import { useState } from "react";
import { CheckmarkIcon } from "react-hot-toast";
import { BeakerIcon } from "@heroicons/react/24/solid";

export interface EncryptedData {
  encryptedString: Blob;
  encryptedSymmetricKey: Uint8Array;
}

export default function Home() {
  const [messageToEncrypt, setMessageToEncrypt] = useState<string>("");
  const [encryptedData, setEncryptedData] = useState<EncryptedData | null>(
    null
  );

  return (
    <>
      <main className="w-full min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <BeakerIcon className="w-16 h-16 text-green-500" />
          {/* <input
            type="text"
            className="p-2 rounded w-72"
            value={messageToEncrypt}
            onChange={(e) => setMessageToEncrypt(e.target.value)}
          />
          <LitEncrypt
            messageToEncrypt={messageToEncrypt}
            setEncryptedData={setEncryptedData}
          /> */}
          {!!encryptedData && (
            <div className="flex items-center space-x-2 pt-4">
              <CheckmarkIcon className="w-6 h-6 text-green-500" />

              <p>Data Added</p>
            </div>
          )}

          <ShadowUpload encryptedData={encryptedData} />
        </div>
      </main>
    </>
  );
}
