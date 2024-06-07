import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <section>
      <Image alt="logo" src={"/main-logo.svg"} width={100} height={100} />
    </section>
  );
};

export default Logo;
