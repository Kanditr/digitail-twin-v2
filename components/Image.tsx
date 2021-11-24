import React from "react";
import useDarkMode from "use-dark-mode";

const Image = ({ className, src, srcDark, srcSet, srcSetDark, alt }: any) => {
  const darkMode = useDarkMode(false);

  return (
    <img
      className={className}
      srcSet={darkMode.value ? srcSetDark : srcSet}
      src={darkMode.value ? srcDark : src}
      alt={alt}
    />
  );
};

export default Image;
