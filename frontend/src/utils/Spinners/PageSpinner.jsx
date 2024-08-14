import React from 'react';
import { ScaleLoader } from 'react-spinners';
function PageSpinner() {
  const spinnerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };
  return (
    <div style={spinnerStyle}>
      <ScaleLoader color="#123abc" loading />
    </div>
  );
}

export default PageSpinner;
