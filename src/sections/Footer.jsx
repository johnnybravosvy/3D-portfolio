import React from "react";
import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center md:items-start items-center">
          <a href="/">Chibuzor Ezeufoh</a>
        </div>

        <div className="socials">
          {socialImgs.map((img) => (
            <a
              className="icon"
              href={img.url}
              target="_blank"
              rel="noopener noreferrer"
              key={img.name}
            >
              <img src={img.imgPath} alt={img.alt} />
            </a>
          ))}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            ©️ {new Date().getFullYear()} Chibuzor Ezeufoh. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
