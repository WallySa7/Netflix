import { useState } from "react";
import "./PreviewModal.css";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { closeDetails } from "../../features/detailsModalSlice";
import { api_Img } from "../Api";

const PreviewModal = () => {
  const title = useSelector((state) => state.detailsModal.value.title);
  const desc = useSelector((state) => state.detailsModal.value.description);
  const img = useSelector((state) => state.detailsModal.value.img);
  const vote = useSelector((state) => state.detailsModal.value.vote);
  const year = useSelector((state) => state.detailsModal.value.year);
  const seasons = useSelector((state) => state.detailsModal.value.seasons);
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
          <h1 style={{ color: "red" }}>LOADING...</h1>
        ) : (
          <>
            <div className='header'>
              <div className='img_parent'>
                <img src={api_Img + img} alt={title} />
              </div>
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
