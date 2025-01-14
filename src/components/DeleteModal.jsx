import { useAppContext } from "./AppContextProvider";

function DeleteModal() {
  const { activeDoc, deleteDoc, setIsDelModalOpen } = useAppContext();

  const handleDelete = () => {
    deleteDoc();
    setIsDelModalOpen(false);
  };

  return (
    <div
      onClick={() => setIsDelModalOpen(false)}
      style={{ backgroundColor: "hsla(213, 4%, 51%, 0.5)" }}
      className="flex justify-center items-center absolute inset-0 z-30"
    >
      <section
        onClick={(event) => event.stopPropagation()}
        aria-modal="true"
        className="max-w-[400px] w-[calc(100%-2rem)] dark:bg-dark-bg-primary bg-light-bg-primary dark:text-dark-text-secondary text-light-text-secondary text-center rounded-md p-5 grid gap-4"
      >
        <h4 className="dark:text-dark-text-primary text-light-text-primary text-h4 font-bold">
          Delete '{activeDoc?.name || ""}'?
        </h4>

        <p>
          Are you sure you want to delete the '{activeDoc?.name || ""}' document
          and its contents? This action cannot be reversed.
        </p>

        <button type="button" onClick={handleDelete} className="btn capitalize">
          Confirm & delete
        </button>
      </section>
    </div>
  );
}

export default DeleteModal;
