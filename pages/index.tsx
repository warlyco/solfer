import { LitEncrypt } from "@/features/lit-encrypt";
import ShadowUpload from "@/features/shadow-upload";

export default function Home() {
  return (
    <>
      <main className="w-full min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <ShadowUpload />
        {/* <LitEncrypt /> */}
      </main>
    </>
  );
}
