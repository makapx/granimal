import { ToastType, useCloseToastAction } from "../../store";

const Toast = ({toast: { id, title, message}}: { toast: ToastType }) => {
  const closeAction = useCloseToastAction();
  return (
    <>
      <div
        id="toast-message-cta"
        className="w-full max-w-xs p-4 text-gray-500 bg-violet-400 rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
        role="alert"
      >
        <div className="flex">
          <img
            className="w-8 h-8 rounded-full"
            src="https://i.pinimg.com/564x/49/4c/68/494c68940a28c06c31a87f9116b557eb.jpg"
            alt="Avviso"
          />
          <div className="ms-3 text-sm text-left font-normal">
            <span className="mb-1 text-sm font-semibold text-neutral-content dark:text-white">
              {title}
            </span>
            <div className="mb-2 text-sm font-normal text-neutral-content">
              {message}
            </div>
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-transparent justify-center items-center flex-shrink-0 text-base-100 hover:text-gray-900 rounded-lg focus:ring-0 p-1.5 inline-flex h-8 w-8  dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-message-cta"
            aria-label="Close"
            onClick={() => closeAction(id)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
export default Toast;
