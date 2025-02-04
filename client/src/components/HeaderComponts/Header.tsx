import { UseAuthContext } from "../../context/AuthContext";

export const Header = () => {
  const { user, logoutUser } = UseAuthContext();
  return (
    <div className="border-b border-neutral px-5 py-3 flex items-center justify-between">
      <p>Search goes here</p>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <div className="p-1 bg-base-200 rounded-lg shadow-sm border border-neutral">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 fill-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>

          <p className="text-base-content text-sm  font-medium">{user.email}</p>
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-square btn-base-300  btn-sm btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <ul tabIndex={0} className="dropdown-content  menu bg-base-100  rounded-box z-1 p-2 shadow-md">
            <li className="flex items-center justify-between w-full">
              <button
                onClick={() => logoutUser()}
                className="btn btn-sm text-error hover:bg-error/20 hover:border-error/20 btn-ghost w-full justify-between"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
