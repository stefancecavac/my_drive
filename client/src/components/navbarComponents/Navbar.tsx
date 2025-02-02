export const Navbar = () => {
  return (
    <div className="w-70 flex flex-col gap-5  shadow-lg p-2 border-r border-neutral">
      <div className="flex  items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary size-10"
        >
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
        <h1 className="text-base-content text-2xl font-bold">My-Drive</h1>
      </div>

      <div className="flex flex-col gap-2"></div>
    </div>
  );
};
