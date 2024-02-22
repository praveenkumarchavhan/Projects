import React, { useState, useEffect } from 'react';
import './Cards.css'; 

function AlertPopup({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      const timeoutId = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [message]);

  return (
    <div className={`alert-popup ${visible ? 'show' : ''}`}>
      {message}
    </div>
  );
}

export default AlertPopup;
