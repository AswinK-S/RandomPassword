import { useState } from "react";
import axios from "./services/axiosService";
import PopupMessage from "./components/PopupMessage";
import bgImg from './public/biometric-technology-background-with-fingerprint-scanning-system-virtual-screen-digital-remix.jpg'

function App() {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true,
  });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  //onchange function
  const handleOptionChange = (option, checked) => {
    setOptions(prevOptions => {
      const newOptions = { ...prevOptions, [option]: checked };
      if (Object.values(newOptions).some(val => val)) {
        setErrorMessage("");
      }
      return newOptions;
    });
  };

  //generate password
  const handleGeneratePassword = async () => {
    if (
      !options.uppercase &&
      !options.lowercase &&
      !options.numbers &&
      !options.special
    ) {
      setErrorMessage("Please choose at least one option.");
      return;
    }
    try {
      console.log('length', length, 'op ', options);
      const response = await axios.post("/passwords", { length, options });
      const data = response.data;
      console.log(data);
      setGeneratedPassword(data.password);
      setErrorMessage("");
    } catch (error) {
      console.error("Error generating password:", error);
      setErrorMessage(error.message);
    }
  };

  //copy password
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedPassword)
      .then(() => {
        setShowPopup(true);
      })
      .catch((error) => {
        console.error("Error copying password to clipboard:", error);
      });
  };

  return (
    <>
    {/* popup message for copying  */}
      {showPopup && (
        <PopupMessage
          message="Password copied to clipboard!"
          onClose={() => setShowPopup(false)}
        />
      )}

        <div className="password-generator flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{backgroundImage: `url(${bgImg})`}}>

        <div className="bg-white bg-opacity-55 p-8 rounded-lg ">
          <div className=" flex justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Strong Password Generator
          </h1>
          </div>
        

          {/* Error Message (if any) */}
          {errorMessage && (
            <div className="error-message text-red-500 text-center mb-4">
              {errorMessage}
            </div>
          )}

          <div className="options-container flex flex-col items-center gap-4">
            <div className="flex items-center">
              <label className="text-lg text-black mr-4">Length:</label>
              <input
                type="number"
                className="w-20 rounded-md bg-gray-100 px-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="checkbox-container flex items-center">
                <input
                  type="checkbox"
                  id="uppercase"
                  checked={options.uppercase}
                  onChange={(e) =>
                    setOptions({ ...options, uppercase: e.target.checked })
                    
                  }
                  className="mr-2"
                />
                <label htmlFor="uppercase" className="text-lg text-black">
                  Uppercase Letters
                </label>
              </div>
              <div className="checkbox-container flex items-center">
                <input
                  type="checkbox"
                  id="lowercase"
                  checked={options.lowercase}
                 
                  onChange={(e) => handleOptionChange("lowercase", e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="lowercase" className="text-lg text-black">
                  Lowercase Letters
                </label>
              </div>
              <div className="checkbox-container flex items-center">
                <input
                  type="checkbox"
                  id="numbers"
                  checked={options.numbers}
                

                  onChange={(e) => handleOptionChange("numbers", e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="numbers" className="text-lg text-black">
                  Numbers
                </label>
              </div>
              <div className="checkbox-container flex items-center">
                <input
                  type="checkbox"
                  id="special"
                  checked={options.special}
                

                  onChange={(e) => handleOptionChange("special", e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="special" className="text-lg text-black">
                  Special Characters
                </label>
              </div>
            </div>
          </div>

          <div className="password-container flex mt-8">
            <input
              type="text"
              className="w-full rounded-md bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              value={generatedPassword}
              readOnly
            />
            <button
              className="generate-button bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed ml-4"
              onClick={handleGeneratePassword}
            >
              Generate Password
            </button>
            <button
              className="copy-button bg-gray-400 font-semibold text-white px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed ml-4"
              onClick={handleCopyToClipboard}
              disabled={!generatedPassword}
            >
              Copy
            </button>
          </div>
          </div>
        </div>
    </>
  );
}

export default App;
