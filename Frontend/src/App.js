import Featured from "./components/Featured";
import Nav from "./components/Nav";
import Row from "./components/row/Row";
import {
  api_Trending,
  api_Top20today,
  api_Tvthrillers,
  api_ActionandAdventure,
  api_UsTvShows,
} from "./components/Api";

function App() {
  return (
    <div className='App'>
      <Nav />
      <Featured />
      <Row title='Trending Now' api={api_Trending} />
      <Row title='Top 20 Today' api={api_Top20today} />
      <Row title='Tv Thrillers' api={api_Tvthrillers} />
      <Row title='Action & Adventure' api={api_ActionandAdventure} />
      <Row title='US TV Shows' api={api_UsTvShows} />
    </div>
  );
}

export default App;
