import { useState } from "react";
import "./PreviewModal.css";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { closeDetails } from "../../features/detailsModalSlice";
import { api_Img } from "../Api";

const PreviewModal = () => {
  const details = useSelector((state) => state.detailsModal.value);
  const dispatch = useDispatch();
  const handleCloseDetailsModal = () => {
    dispatch(closeDetails());
  };
  const handleConvertMinToHour = (min) => {
    const time = min / 60;
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return hours + "h" + " " + minutes + "m";
  };
  return (
    <>
      <div
        className={`detailsOverlay${details.isOpened ? " toggle" : ""}`}
        onClick={handleCloseDetailsModal}></div>
      <div className='previewModal'>
        {details.isLoading ? (
          <h1 style={{ color: "red" }}>LOADING...</h1>
        ) : (
          <>
            <div className='img_parent'>
              <img src={api_Img + details.img} alt={details.title} />
            </div>
            <div className='wrapper'>
              <div className='section1'>
                <button className='close-btn' onClick={handleCloseDetailsModal}>
                  <AiOutlineClose className='close-icon' />
                </button>
                <div className='info'>
                  <div className='sec1-left'>
                    <div className='space-between'>
                      <div>
                        {details.year && (
                          <span className='year'>
                            {details.year.split("-")[0]}
                          </span>
                        )}

                        <span>{details.adult && "18+"}</span>
                        {details.seasons ? (
                          <span>{details.seasons} Seasons</span>
                        ) : (
                          <span>{handleConvertMinToHour(details.time)}</span>
                        )}
                      </div>
                      <div className='genres-parent'>
                        <span className='tags-label'> Genres:&nbsp;</span>
                        {details.genres.join(", ")}
                      </div>
                    </div>
                    <div className='section-divider'></div>
                    <h1 className='title'>{details.title}</h1>
                    <p className='desc'>{details.description}</p>
                  </div>
                </div>
              </div>
              <div className='section-divider'></div>
              <div className='section2'>
                <h1>Trailer</h1>
                <iframe
                  width='420'
                  height='315'
                  allowfullscreen=''
                  src={`https://www.youtube.com/embed/${details.trailer}`}
                />
              </div>
              <div className='section-divider'></div>
              <div className='section3'>
                <h1>More Like This</h1>
                {/* {details.similars} */}
              </div>
              <div className='section-divider'></div>
              <div className='section4'>
                <h1>About {details.title}</h1>
                <div className='more_details'>
                  {details?.director && (
                    <div>
                      <span className='tags-label'>Director: </span>
                      <span>{details?.director}</span>
                    </div>
                  )}
                  {details?.cast && (
                    <div>
                      <span className='tags-label'>Cast: </span>
                      {details.cast.join(", ")}
                    </div>
                  )}
                  {details?.genres && (
                    <div>
                      <span className='tags-label'>Genres: </span>
                      <span>{details?.genres.join(", ")}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PreviewModal;
