const CustomButton = ({ name, route }) => {
    return (
      <div className="flex flex-col items-center">
        <a
          href={route}  // Use a simple anchor tag for navigation
          className="mt-8 flex items-center space-x-3 px-5 py-3 bg-transparent border-2 border-purple-500 border-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:border-gradient-to-br hover:scale-105 transition-all duration-300"
        >
          <span>{name}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="ml-2 w-6 h-6"
          >
            <path
              d="M9 18l6-6-6-6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    );
  };
  
  export default CustomButton;
  