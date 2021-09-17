import { useState, useEffect } from "react";
import { api_Key, api_Movie, api_Tv } from "../Api";
import axios from "axios";
import "./Row_Item.css";

const Row_Item = ({ api, api_Img, trend, handleDetails }) => {
  const [isTvShow, setIsTvShow] = useState(null);
  useEffect(() => {
    if (trend?.media_type) {
      setIsTvShow(trend?.media_type === "tv" ? true : false);
    } else {
      setIsTvShow(api.includes("tv") ? true : false);
    }
  }, []);

  const handleRowItem = () => {
    handleDetails(true);
    const api_Rest = `?api_key=${api_Key}&language=en-US`;
    axios
      .get(
        isTvShow
          ? api_Tv + trend?.id + api_Rest
          : api_Movie + trend?.id + api_Rest
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className='row-item' onClick={handleRowItem}>
      <img src={api_Img + trend?.poster_path} alt={trend?.title} />
    </div>
  );
};

export default Row_Item;
