import { NewItemModal } from "../NewItemComponents/NewItemModal";

export const NewItemButton = () => {
  const handleModalOpen = () => {
    const openModal = document.getElementById("new-item-modal") as HTMLDialogElement;
    if (!openModal) return;
    openModal.showModal();
  };

  return (
    <button className="btn btn-primary w-full gap-3  justify-start" onClick={handleModalOpen}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      <p>New Item</p>
      <NewItemModal></NewItemModal>
    </button>
  );
};
