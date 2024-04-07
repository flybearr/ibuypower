import Image from "next/image";
import Silder from "@/app/.(components)/slider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24 ">
      <Silder />
    </main>
  );
}
