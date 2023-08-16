import { XMarkIcon } from "@heroicons/react/24/outline";

export default function FailedAlert({ message, setAlertOpen }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-6 rounded relative ">
      <span>{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <XMarkIcon
          className="w-6 h-6"
          role="button"
          onClick={() => {
            setAlertOpen(false);
            window.location.reload();
          }}
        />
      </span>
    </div>
  );
}
