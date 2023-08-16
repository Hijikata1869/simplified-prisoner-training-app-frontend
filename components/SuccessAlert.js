import { XMarkIcon } from "@heroicons/react/24/outline";

export default function SuccessAlert({ message, setAlertOpen }) {
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-6 rounded relative ">
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
