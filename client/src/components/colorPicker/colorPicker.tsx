import { useState } from "react";
import { ChromePicker } from "react-color";
import "./colorPicker.css";

const ColorPicker = () => {
  const [color, setColor] = useState("#ffefd5");
  const [showColors, setShowColors] = useState(false);

  const handleColor = (updatedColor: string) => {
    document.body.style.backgroundColor = updatedColor;
    setColor(updatedColor);
  };

  return (
    <>
      <div>
        <button
          className="toogle-window"
          onClick={() => setShowColors((showColors) => !showColors)}
        >
          {showColors ? "Minimize" : "Colors"}
        </button>
        <div className="color-window">
          {showColors && (
            <ChromePicker
              color={color}
              onChange={(updatedColor) => handleColor(updatedColor.hex)}
            />
          )}
        </div>
        <div>
          <button
            className="toogle-window"
            onClick={() => handleColor("#ffefd5")}
          >Reset Color</button>
        </div>
      </div>
    </>
  );
};

export default ColorPicker;
