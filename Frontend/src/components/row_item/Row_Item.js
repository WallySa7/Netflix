import { useState, useEffect } from "react";
import { api_Key, api_Movie, api_Tv } from "../Api";
import {
  openDetails,
  openDetailsAndSetLoading,
  updateDetails,
} from "../../features/detailsModalSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Row_Item.css";

const Row_Item = ({ api, api_Img, trend }) => {
  const [isTvShow, setIsTvShow] = useState(true);
  const dispatch = useDispatch();
  const isMainModalTvShow = useSelector(
    (state) => state.detailsModal.value.isTvShow
  );
  const id = useSelector((state) => state.detailsModal.value.id);

  const handleType = () => {
    if (trend?.media_type) {
      return setIsTvShow(trend?.media_type === "tv" ? true : false);
    } else if (api) {
      return setIsTvShow(api?.includes("tv") ? true : false);
    } else {
      isMainModalTvShow ? setIsTvShow(true) : setIsTvShow(false);
    }
  };

  useEffect(() => {
    handleType();
  }, []);

  const handleEmptyArray = (array) => {
    if (array.length === 0) {
      array = null;
    }
  };

  const handleRequests = (isShow) => {
    const api_Rest = `?api_key=${api_Key}&language=en-US`;
    const similar = `/similar?api_key=${api_Key}&language=en-US&page=1`;
    const tvDetails = api_Tv + trend?.id;
    const movieDetails = api_Movie + trend?.id;
    const tvDetailsRequest = tvDetails + api_Rest;
    const movieDetailsRequest = movieDetails + api_Rest;
    const tvSimilarRequest = tvDetails + similar;
    const movieSimilarRequest = movieDetails + similar;
    const tvTrailerRequest = api_Tv + trend?.id + "/videos" + api_Rest;
    const movieTrailerRequest = api_Movie + trend?.id + "/videos" + api_Rest;
    const tvCreditsRequest = api_Tv + trend?.id + "/credits" + api_Rest;
    const movieCreditsRequest = api_Movie + trend?.id + "/credits" + api_Rest;

    if (isShow) {
      return [
        axios.get(tvDetailsRequest),
        axios.get(tvTrailerRequest),
        axios.get(tvSimilarRequest),
        axios.get(tvCreditsRequest),
      ];
    } else {
      return [
        axios.get(movieDetailsRequest),
        axios.get(movieTrailerRequest),
        axios.get(movieSimilarRequest),
        axios.get(movieCreditsRequest),
      ];
    }
  };

  const handleRowItem = async () => {
    if (trend.id === id) {
      return dispatch(openDetails());
    }
    dispatch(openDetailsAndSetLoading());
    axios
      .all(handleRequests(isTvShow))
      .then(
        axios.spread((data1, data2, data3, data4) => {
          const d1 = data1.data;
          const d2 = data2.data.results.find(
            (vid) => vid.type === "Trailer"
          )?.key;
          const d3 = data3.data.results;
          const d4 = data4.data;
          const runtime = d1?.runtime;
          let created_by = [];
          let cast = [];
          let genres = [];
          isTvShow
            ? d1.created_by.map((creator) => created_by.push(creator?.name))
            : d4?.crew.map(
                (dir) => dir?.job === "Director" && created_by.push(dir?.name)
              );
          d4.cast
            .filter((act) => act?.known_for_department === "Acting")
            .map((actor) => cast.push(actor?.name));
          d1?.genres.map((gen) => genres.push(gen?.name));
          handleEmptyArray(created_by);
          handleEmptyArray(cast);
          handleEmptyArray(genres);
          dispatch(
            updateDetails({
              id: d1?.id,
              title: d1?.title || d1?.name || d1?.original_title,
              description: d1?.overview,
              img: d1?.backdrop_path || d1?.poster_path,
              vote: d1?.vote_average,
              year: d1?.first_air_date || d1?.release_date,
              adult: d1?.adult,
              seasons: d1?.number_of_seasons,
              time: runtime,
              genres: genres,
              trailer: d2,
              similars: d3,
              created_by: created_by,
              cast: cast,
              isTvShow: isTvShow,
              isLoading: false,
              isOpened: true,
            })
          );
        })
      )
      .catch((err) => console.log(err));
    //   dispatch(openDetails());
    //   const api_Rest = `?api_key=${api_Key}&language=en-US`;
    //   const similar_Movies = `${trend.id}/similar?api_key=${api_Key}&language=en-US&page=1`;

    //   axios
    //     .all(
    //       [
    //         axios.get(
    //           isTvShow
    //             ? api_Tv + trend?.id + api_Rest
    //             : api_Movie + trend?.id + api_Rest
    //         ),
    //       ],
    //       []
    //     )
    //     .then((data1, data2) => {});

    // try {
    //   const res = await axios.get(
    //     isTvShow
    //       ? api_Tv + trend?.id + api_Rest
    //       : api_Movie + trend?.id + api_Rest
    //   );

    //   const data = await res.data;
    //   dispatch(
    //     updateDetails({
    //       id: data?.id,
    //       title: data?.title || data?.name,
    //       description: data?.overview,
    //       isLoading: false,
    //       isOpened: true,
    //     })
    //   );
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <div className='row-item' onClick={handleRowItem}>
      <img src={api_Img + trend?.poster_path} alt={trend?.title} />
    </div>
  );
};

export default Row_Item;
