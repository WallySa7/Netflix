import { useState, useEffect } from "react";
import axios from "axios";
import { api_Top20today, api_Img } from "./Api";
import { IoPlay, IoInformationCircleSharp } from "react-icons/io5";

const Featured = () => {
  const [featured, setFeatured] = useState({});
  const handleSubString = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const handleFeaturedDescOnBrowserSize = (str, n) => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      return handleSubString(str, n - 50);
    } else {
      return handleSubString(str, n);
    }
  };

  useEffect(() => {
    axios
      .get(api_Top20today)
      .then((res) => {
        const feature =
          res.data.results[
            Math.ceil(Math.random() * res.data.results.length - 1)
          ];
        setFeatured(feature);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className='banner'>
      <div className='linear'></div>
      <img
        className='banner-img'
        src={api_Img + featured?.backdrop_path}
        alt={featured?.title || featured?.name}
      />
      <div className='banner-info'>
        <h1 className='banner-title'>{featured?.title || featured?.name}</h1>
        <div className='banner-desc'>
          {handleFeaturedDescOnBrowserSize(featured?.overview, 200)}
        </div>
        <div className='banner-buttons'>
          <button className='play-btn'>
            <IoPlay className='btn-icon' />
            <span>Play</span>
          </button>
          <button className='info-btn'>
            <IoInformationCircleSharp className='btn-icon' />
            <span>More Info</span>
          </button>
        </div>
      </div>
      <div className='banner-cut'></div>
    </div>
  );
};

export default Featured;
