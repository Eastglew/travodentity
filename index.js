import { useState } from 'react';
import QRCode from 'qrcode.react';
import CryptoJS from 'crypto-js';

export default function Home() {
  const [passportImg, setPassportImg] = useState(null);
  const [selfieImg, setSelfieImg] = useState(null);
  const [qrData, setQrData] = useState('');

  const handleImage = (e, type) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      type === 'passport' ? setPassportImg(reader.result) : setSelfieImg(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const generateQR = () => {
    const payload = JSON.stringify({ passportImg, selfieImg });
    const encrypted = CryptoJS.AES.encrypt(payload, 'secret-key').toString();
    setQrData(encrypted);
  };

  return (
    <div>
      <h2>Travodentity: Traveler Check-In</h2>
      <input type="file" accept="image/*" onChange={(e) => handleImage(e, 'passport')} /> Passport<br />
      <input type="file" accept="image/*" onChange={(e) => handleImage(e, 'selfie')} /> Selfie<br />
      <button onClick={generateQR}>Generate QR</button>
      {qrData && <QRCode value={qrData} size={256} />}
    </div>
  );
}
