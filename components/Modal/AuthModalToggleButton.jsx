export default function AuthModalToggleButton() {
  return (
    <button
      onClick={() => {
        console.log("asd");
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 fill-current text-gray-700 cursor-pointer -mt-12 hover:fill-gray-50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
