import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const GrantsApplicationModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    website: "",
    projectCategory: [],
    requestedAmount: "",
    projectImpact: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // For error messages

  const questions = [
    { name: "projectName", label: "Project Name", type: "text", required: true },
    { name: "projectDescription", label: "Project Description", type: "textarea", required: true },
    { name: "website", label: "Website (optional)", type: "text", required: false },
    {
      name: "projectCategory",
      label: "Project Category",
      type: "checkbox",
      options: [
        "DeFi",
        "Dapp",
        "Tokenomics",
        "Chains",
        "Gamifi",
        "Voting and Governance",
        "Tools",
        "Others",
      ],
      required: false,
    },
    { name: "requestedAmount", label: "Requested Amount", type: "text", required: true },
    { name: "projectImpact", label: "Project Impact", type: "textarea", required: true },
  ];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setErrorMessage(""); // Clear error message when navigating
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setErrorMessage(""); // Clear error message when navigating
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const category = [...formData.projectCategory];
      if (checked) {
        category.push(value);
      } else {
        const index = category.indexOf(value);
        if (index > -1) category.splice(index, 1);
      }
      setFormData({ ...formData, projectCategory: category });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    // Validation check for required fields
    const missingFields = [];
    questions.forEach((question) => {
      if (question.required && !formData[question.name] && !Array.isArray(formData[question.name])) {
        missingFields.push(question.label);
      }
    });

    if (missingFields.length > 0) {
      setErrorMessage(`Please fill in the following required fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const response = await fetch("/api/grants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        onClose(); // Close modal on successful submission
      } else {
        alert("Error submitting application.");
      }
    } catch (error) {
      alert("Failed to submit. Please try again later.");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
        <div className="bg-[#1a1a1a] text-white w-11/12 max-w-5xl rounded-lg p-8 relative shadow-lg">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-1 left-1/2 transform -translate-x-1/2 text-white text-3xl"
          >
            &times;
          </button>

          {/* Progress Bar */}
          <div className="h-2 bg-gray-700 rounded-full mb-6 relative">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question */}
          <div>
            <label className="block text-xl font-semibold mb-2">
              {questions[currentStep].label}{" "}
              {questions[currentStep].required && <span className="text-red-500">*</span>}
            </label>

            {questions[currentStep].type === "text" && (
              <input
                type="text"
                name={questions[currentStep].name}
                value={formData[questions[currentStep].name]}
                onChange={handleChange}
                className={`w-full bg-transparent border-b border-white outline-none py-2 ${
                  errorMessage && !formData[questions[currentStep].name] ? "border-red-500" : ""
                }`}
              />
            )}

            {questions[currentStep].type === "textarea" && (
              <textarea
                name={questions[currentStep].name}
                value={formData[questions[currentStep].name]}
                onChange={handleChange}
                className={`w-full bg-transparent border-b border-white outline-none py-2 ${
                  errorMessage && !formData[questions[currentStep].name] ? "border-red-500" : ""
                }`}
                rows={4}
              ></textarea>
            )}

            {questions[currentStep].type === "checkbox" && (
              <div className="grid grid-cols-2 gap-2">
                {questions[currentStep].options.map((option, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.projectCategory.includes(option)}
                      onChange={handleChange}
                      className="form-checkbox text-white bg-transparent"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 text-red-500 text-sm">
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Navigation Icons */}
          <div className="absolute bottom-4 right-4 bg-gray-700 p-2 rounded-full flex items-center gap-4">
            <button
              className="text-3xl text-white"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <IoIosArrowUp />
            </button>
            <button
              className="text-3xl text-white"
              onClick={handleNext}
              disabled={currentStep === questions.length - 1}
            >
              <IoIosArrowDown />
            </button>
          </div>

          {/* Submit Button */}
          {currentStep === questions.length - 1 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full text-white"
              >
                Submit Application
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default GrantsApplicationModal;
