import React from "react";
import { Card } from "../ui/card";

const Footer: React.FC = () => {
  return (
    <Card className="w-full bg-black text-[#F8C496] py-8 mt-8 relative">
      <div className="container mx-auto grid grid-cols-3 gap-8 px-4 justify-items-center">
        
        <div>
          <h3 className="text-lg font-semibold mb-2">KONTAKT</h3>
          <p>EPOST: bio@gmail.com</p>
          <p>TELE: 123 21 213 45</p>
          <p>FAQ</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">HITTA HIT</h3>
          <p>Gatan 666</p>
          <p>12345 Ort</p>
          <p>Google Map</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">FÖLJ OSS</h3>
          <p>Facebook</p>
          <p>Instagram</p>
        </div>
      </div>
      
      <div className="text-end pr-10 text-[#F8C496]-400">
        <p>COPYRIGHT © FRONTEND GRUPP 5 2024</p>
      </div>
    </Card>
  );
};

export default Footer;
