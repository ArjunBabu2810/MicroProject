import React from "react";
import background from '../assets/wallpaper.jpg'

const Layout = ({ children }) => {
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundImage: `url(${background})`, // Adjust the path to your image
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return <div style={styles.container}>{children}</div>;
};

export default Layout;
