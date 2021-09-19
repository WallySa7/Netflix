import { useState, useEffect } from "react";
import { api_Key, api_Movie, api_Tv } from "../Api";
import { openDetails, updateDetails } from "../../features/detailsModalSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Row_Item.css";

const Row_Item = ({ api, api_Img, trend }) => {
  const [isTvShow, setIsTvShow] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (trend?.media_type) {
      setIsTvShow(trend?.media_type === "tv" ? true : false);
    } else {
      setIsTvShow(api.includes("tv") ? true : false);
    }
  }, []);

  const handleRowItem = async () => {
    dispatch(openDetails());
    const api_Rest = `?api_key=${api_Key}&language=en-US`;
    try {
      const res = await axios.get(
        isTvShow
          ? api_Tv + trend?.id + api_Rest
          : api_Movie + trend?.id + api_Rest
      );

      const data = await res.data;
      dispatch(
        updateDetails({
          id: data?.id,
          title: data?.title || data?.name,
          description: data?.overview,
          isLoading: false,
          isOpened: true,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='row-item' onClick={handleRowItem}>
      <img src={api_Img + trend?.poster_path} alt={trend?.title} />
    </div>
  );
};

export default Row_Item;
