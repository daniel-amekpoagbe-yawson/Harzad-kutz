import toast from "react-hot-toast";

export function confirmToast(message, onConfirm) {
  toast.custom((t) => (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 text-gray-900">
      <p>{message}</p>
      <div className="flex justify-end gap-3 mt-3">
        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm();
          }}
          className="bg-red-500 text-white px-3 py-1 rounded-md"
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md"
        >
          No
        </button>
      </div>
    </div>
  ));
}
