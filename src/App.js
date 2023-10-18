import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const [offset, setOffset] = useState(0);
  const fetchUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;

  const fetchPokemon = async () => {
    try {
      const res = await axios.get(fetchUrl, { headers: {} });
      setData([...data, ...res.data.results]);
      if (offset < 980) {
        setOffset((prev) => prev + 20);
      }
      if (res.data.next == null || offset >= 980) {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  console.log(data.length);
  console.log(hasMore);

  return (
    <div className="App flex">
      <h1>PokeDex (with infinite scroll obvo)</h1>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchPokemon}
        hasMore={hasMore}
        loader={<p>Load more...</p>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="main flex">
          {data.map((data, key) => (
            <div className="container" key={key}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  key + 1
                }.png`}
                className="image"
                alt={data.alt_description}
              />
              <h4>
                <a href="https://emoji.gg/emoji/pokeball">
                  <img
                    src="https://cdn3.emoji.gg/emojis/pokeball.png"
                    width="15px"
                    height="15px"
                    alt="pokeball"
                  />
                </a>{" "}
                {data.name}
              </h4>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;
