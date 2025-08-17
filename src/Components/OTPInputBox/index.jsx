import React, { useRef, useState } from "react";

const OtpInput = ({length , onChange }) => {
  
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  // Handle input change
  const handleChange = (element, index) => {
    const value = element.value; // Only digits
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Move to next input
    if (value && index < length -1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
  };
}

  return (
    <div style={{display: "flex", gap: "5px", justifyContent: "center"}} className="otpBox">
        {otp.map((data, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            maxLength="1"
            value={otp[index]}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-[45px] h-[45px] text-center text-[17px]"
          />
        ))}
    </div>
  );
};

export default OtpInput;