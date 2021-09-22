import "./Row.css";
import { useState, useEffect, useRef } from "react";
import { api_Img } from "../Api";
import Row_Item from "../row_item/Row_Item";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import axios from "axios";

const Row = ({ title, api, handlePreviewModal }) => {
  const rowWrap = useRef(null);
  const rowIndicator = useRef(null);
  const [trending, setTrending] = useState([]);
  const [SliderHaveFinished, setSliderHaveFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pxToMove, setPxToMove] = useState(50);
  const rowItem_margin = getComputedStyle(document.documentElement)
    .getPropertyValue("--slider-item-margin-right")
    .match(/\d+/g)[0];
  const currentSlide = useRef(0);

  useEffect(() => {
    axios
      .get(api)
      .then((res) => {
        setTrending(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRowIsFinished = (numOfS, currentS) => {
    if (numOfS == currentS + 1) {
      setSliderHaveFinished(true);
    } else {
      setSliderHaveFinished(false);
    }
  };

  const handleIndicator = (slides, current) => {
    rowIndicator.current.replaceChildren();

    for (let k = 0; k < slides; k++) {
      rowIndicator.current.appendChild(document.createElement("span"));
    }
    const indicator_spans = rowIndicator.current.querySelectorAll("span");

    for (let i = 0; i < indicator_spans.length; i++) {
      indicator_spans[i].classList.remove("active");
    }
    try {
      indicator_spans[current].classList.add("active");
    } catch (error) {
      currentSlide.current = 0;
    }
  };

  const handleCarousel = (direction) => {
    let translateX;
    const row_item_length = rowWrap.current.childElementCount;
    const row_item_size =
      rowWrap.current.querySelector(".row-item").getBoundingClientRect().width +
      Number(rowItem_margin);
    const howMuchToMove = Math.floor(window.innerWidth / row_item_size);
    const howMuchLeft = row_item_length % howMuchToMove;
    const numOfSlides = Math.ceil(row_item_length / howMuchToMove);
    if (!SliderHaveFinished) {
      if (direction === "right") {
        currentSlide.current++;
        handleIndicator(numOfSlides, currentSlide.current);
        if (numOfSlides == currentSlide.current + 1 && howMuchLeft > 0) {
          translateX = currentSlide.current * (row_item_size * howMuchToMove);
          rowWrap.current.style.transform = `translate3D(-${
            translateX - (howMuchToMove - howMuchLeft) * row_item_size
          }px, 0px, 0px)`;
        } else {
          translateX = currentSlide.current * (row_item_size * howMuchToMove);
          rowWrap.current.style.transform = `translate3D(-${translateX}px, 0px, 0px)`;
          setCurrentIndex(currentSlide.current);
        }
        handleRowIsFinished(numOfSlides, currentSlide.current);
      }
    }
    if (currentSlide.current > 0) {
      if (direction === "left") {
        currentSlide.current--;
        handleIndicator(numOfSlides, currentSlide.current);
        translateX = currentSlide.current * (row_item_size * howMuchToMove);
        rowWrap.current.style.transform = `translate3D(-${translateX}px, 0px, 0px)`;
        setCurrentIndex(currentSlide.current);
        handleRowIsFinished(numOfSlides, currentSlide.current);
      }
    }
  };

  let isMouseDown = false;
  let mousePos1 = 0;
  let mousePos2 = 0;
  let sliderMove = 0;

  const hanldeClickType = (e) => {
    if (e.type.includes("touch")) {
      return e.touches[0].clientX;
    } else if (e.type.includes("mouse")) {
      return e.clientX;
    }
  };

  const handleMouseDown = (e) => {
    isMouseDown = true;
    rowWrap.current.classList.add("grabbing");
    mousePos1 = hanldeClickType(e);
  };

  const handleMouseMove = (e) => {
    if (isMouseDown) {
      mousePos2 = hanldeClickType(e);
      sliderMove = mousePos2 - mousePos1;
      if (sliderMove <= -pxToMove) {
        handleCarousel("right");
      } else if (sliderMove >= pxToMove) {
        handleCarousel("left");
      }
    }
  };

  const handleMouseLeave = (e) => {
    isMouseDown = false;
    rowWrap.current.classList.remove("grabbing");
  };

  return (
    <div className='row'>
      <div className='row-header'>
        <h1 className='row-title'>{title}</h1>
        <div className='row-indicator' ref={rowIndicator}>
          <span className='active'></span>
        </div>
      </div>
      <div className='row-parent'>
        {currentIndex > 0 && (
          <span
            className='arrow leftArrow'
            onClick={() => {
              handleCarousel("left");
            }}>
            <span>
              <MdKeyboardArrowLeft />
            </span>
          </span>
        )}
        {!SliderHaveFinished && (
          <span
            className='arrow rightArrow'
            onClick={() => {
              handleCarousel("right");
            }}>
            <span>
              <MdKeyboardArrowRight />
            </span>
          </span>
        )}
        <div
          className='row-container'
          onMouseDown={(e) => {
            e.preventDefault();
            handleMouseDown(e);
          }}
          onMouseMove={(e) => {
            handleMouseMove(e);
          }}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseLeave}
          onTouchStart={(e) => {
            handleMouseDown(e);
          }}
          onTouchMove={(e) => {
            handleMouseMove(e);
          }}
          onTouchEnd={handleMouseLeave}>
          <div className='row-wrapper' ref={rowWrap}>
            {trending.map((trend, index) => {
              return (
                <Row_Item
                  key={index}
                  api={api}
                  api_Img={api_Img}
                  trend={trend}
                  handlePreviewModal={handlePreviewModal}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Row;
