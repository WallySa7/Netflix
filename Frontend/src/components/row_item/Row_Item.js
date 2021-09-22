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
  const [isTvShow, setIsTvShow] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (trend?.media_type) {
      setIsTvShow(trend?.media_type === "tv" ? true : false);
    } else {
      setIsTvShow(api.includes("tv") ? true : false);
    }
  }, []);
  const id = useSelector((state) => state.detailsModal.value.id);

  const handleRequest = (isShow = false) => {
    const api_Rest = `?api_key=${api_Key}&language=en-US`;
    const similar = `/similar?api_key=${api_Key}&language=en-US&page=1`;
    const tvDetails = api_Tv + trend?.id;
    const movieDetails = api_Movie + trend?.id;
    const tvDetailsRequest = tvDetails + api_Rest;
    const movieDetailsRequest = movieDetails + api_Rest;
    const tvSimilarRequest = tvDetails + similar;
    const movieSimilarRequest = movieDetails + similar;
    const tvTrailer = api_Tv + trend?.id + "/videos" + api_Rest;
    const movieTrailer = api_Movie + trend?.id + "/videos" + api_Rest;
    const tvCredits = api_Tv + trend?.id + "/credits" + api_Rest;
    const movieCredits = api_Movie + trend?.id + "/credits" + api_Rest;

    if (isShow) {
      return [
        axios.get(tvDetailsRequest),
        axios.get(tvTrailer),
        axios.get(tvSimilarRequest),
        axios.get(tvCredits),
      ];
    } else {
      return [
        axios.get(movieDetailsRequest),
        axios.get(movieTrailer),
        axios.get(movieSimilarRequest),
        axios.get(movieCredits),
      ];
    }
  };

  const handleRowItem = async () => {
    if (trend.id == id) {
      return dispatch(openDetails());
    }
    dispatch(openDetailsAndSetLoading());
    axios
      .all(handleRequest(isTvShow))
      .then(
        axios.spread((data1, data2, data3, data4) => {
          const d1 = data1.data;
          const d2 = data2.data.results.find(
            (vid) => vid.type == "Trailer"
          )?.key;
          const d3 = data3.data.results.slice(0, 10);
          const d4 = data4.data;
          let cast = [];
          let genres = [];
          const runtime = d1?.runtime;
          const director = d4?.crew.find(
            (dir) => dir?.job === "Director"
          )?.name;
          d4.cast
            .filter((act) => act?.known_for_department === "Acting")
            .map((actor) => cast.push(actor?.name));
          d1?.genres.map((gen) => genres.push(gen?.name));
          console.log(d1);
          if (cast.length === 0) {
            cast = null;
          }
          if (genres.length === 0) {
            genres = null;
          }
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
              director: director,
              cast: cast,
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
