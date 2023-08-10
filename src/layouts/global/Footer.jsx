import React from 'react';
import { Box, Link } from "@mui/material";

const Footer = () => {
  const footerStyles = {
    background: "#f0f0f0",
    padding: "20px",
    textAlign: "center",
    borderTop: "1px solid #ddd",
  };

  const linkStyles = {
    marginRight: "20px",
    color: "#333",
    textDecoration: "none",
  };

  return (
    <Box style={footerStyles}>
      <Link href="/about" style={linkStyles}>
        About Us
      </Link>
      <Link href="/services" style={linkStyles}>
        Services
      </Link>
      <Link href="/contact" style={linkStyles}>
        Contact Us
      </Link>
      <Link href="/social-media" style={linkStyles}>
        Social Media
      </Link>
    </Box>
  );
};

export default Footer;
