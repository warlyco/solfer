import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  return (
    <div className="w-full py-8 fixed">
      <div className="mx-auto max-w-5xl flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div>solfer</div>
        </Link>
        <WalletMultiButton />
      </div>
    </div>
  );
};

export default Navbar;
