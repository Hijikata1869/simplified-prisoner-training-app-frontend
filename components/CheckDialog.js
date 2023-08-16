import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function CheckDialog({ modalConfig }) {
  const { promiseResolve, setIsOpen } = modalConfig;
  return (
    <Dialog
      open={true}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="flex flex-col items-center justify-center w-full max-w-xs rounded bg-white p-4 shadow-xl">
          <div className="flex items-center justify-center mb-4">
            <div className="mx-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
            </div>
            <Dialog.Title className="ml-2 text-xl">削除しますか？</Dialog.Title>
          </div>
          <div className="flex">
            <button
              className="mt-3 mr-2 inline-flex w-auto justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              キャンセル
            </button>
            <button
              className="mt-3 ml-2 inline-flex w-auto rounded-md bg-red-600 text-sm font-semibold text-white px-3 py-2 shadow-sm hover:bg-red-500"
              onClick={() => promiseResolve("ok")}
            >
              削除する
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
