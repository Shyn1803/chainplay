import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-linear-gradient flex flex-col items-center py-6 px-10">
      <Image src="/assets/chainplay-logo-white.svg" alt="chainplay logo white" width={192} height={32} />
      <span className="mt-6 text-white">FAQ  |  Newsletter  |  Advertise  |  Contact Us  |  Press Kit  |  Privacy  |  Terms</span>
      <span className="mt-6 text-white opacity-50">© 2021 PlayToEarn.net - all rights reserved</span>
    </footer>
  );
};

export default Footer;
