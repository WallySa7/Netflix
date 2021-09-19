import { useState } from "react";
import "./PreviewModal.css";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { closeDetails } from "../../features/detailsModalSlice";

const PreviewModal = () => {
  const title = useSelector((state) => state.detailsModal.value.title);
  const desc = useSelector((state) => state.detailsModal.value.description);
  const dispatch = useDispatch();
  const handleCloseDetailsModal = () => {
    dispatch(closeDetails());
  };
  const isOpened = useSelector((state) => state.detailsModal.value.isOpened);
  const isLoading = useSelector((state) => state.detailsModal.value.isLoading);

  return (
    <>
      <div
        className={`detailsOverlay${isOpened ? " toggle" : ""}`}
        onClick={handleCloseDetailsModal}></div>
      <div className='previewModal'>
        {isLoading ? (
          <h1 style={{ color: "red" }}>welcome baby to the website</h1>
        ) : (
          <>
            {" "}
            <div className='header'>
              <button className='close-btn' onClick={handleCloseDetailsModal}>
                <AiOutlineClose className='close-icon' />
              </button>
            </div>
            <h1>{title}</h1>
            <p>{desc}</p>
          </>
        )}
      </div>
    </>
  );
};

export default PreviewModal;
