import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

export default function Host() {
  const [guestData, setGuestData] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 250 });
    scanner.render(
      (decoded) => {
        try {
          const bytes = CryptoJS.AES.decrypt(decoded, 'secret-key');
          const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          setGuestData(decrypted);
        } catch (e) {
          alert('Invalid QR Code');
        }
      },
      (err) => console.warn(err)
    );
  }, []);

  return (
    <div>
      <h2>Travodentity: Host Portal</h2>
      <div id="reader" />
      {guestData && (
        <div>
          <h3>Guest Verified</h3>
          <img src={guestData.passportImg} alt="passport" width="200" /><br />
          <img src={guestData.selfieImg} alt="selfie" width="200" /><br />
          <button onClick={() => alert('Submitted to eVisitor!')}>Submit to eVisitor</button>
        </div>
      )}
    </div>
  );
}
