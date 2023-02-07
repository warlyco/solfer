// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as LitJsSdk from "@lit-protocol/lit-node-client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // -- init litNodeClient

  let litNodeClient;
  try {
    litNodeClient = new LitJsSdk.LitNodeClient({
      chain: "solana",
    });
  } catch (error) {}

  if (!litNodeClient) return;

  await litNodeClient.connect();

  const messageToEncrypt = "Lit is 🔥";

  const chain = "solana";

  const authSig = await LitJsSdk.checkAndSignAuthMessage({
    chain: "solana",
  });

  const solRpcConditions = [
    {
      method: "balanceOfMetaplexCollection",
      params: ["FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33"],
      pdaParams: [],
      pdaInterface: { offset: 0, fields: {} },
      pdaKey: "",
      chain,
      returnValueTest: {
        key: "",
        comparator: ">",
        value: "0",
      },
    },
  ];

  // 1. Encryption
  // <Blob> encryptedString
  // <Uint8Array(32)> symmetricKey
  const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
    messageToEncrypt
  );

  // 2. Saving the Encrypted Content to the Lit Nodes
  // <Unit8Array> encryptedSymmetricKey
  const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
    // @ts-ignore
    solRpcConditions,
    symmetricKey,
    authSig,
    chain,
  });

  console.log("encryptedSymmetricKey:", encryptedSymmetricKey);

  // // 3. Decrypt it
  // // <String> toDecrypt
  // const toDecrypt = LitJsSdk.uint8arrayToString(
  //   encryptedSymmetricKey,
  //   "base16"
  // );

  // // <Uint8Array(32)> _symmetricKey
  // const _symmetricKey = await litNodeClient.getEncryptionKey({
  //   accessControlConditions,
  //   toDecrypt,
  //   chain,
  //   authSig,
  // });

  // // <String> decryptedString
  // let decryptedString;

  // try {
  //   decryptedString = await LitJsSdk.decryptString(
  //     encryptedString,
  //     _symmetricKey
  //   );
  // } catch (e) {
  //   console.log(e);
  // }

  // console.warn("decryptedString:", decryptedString);

  res.status(200).json({ name: "John Doe" });
}
