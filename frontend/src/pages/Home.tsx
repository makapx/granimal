import Header from "../components/layout/Header";
import Hero from "../components/pages/home/Hero";
import Container from "../components/layout/Container";
import { useEffect, useState } from "react";
import Toplist from "../components/common/Toplist";
import { AnimeFragment } from "../api/types";
import { searchAnime } from "../api/anime.api";
import Footer from "../components/layout/Footer";
import Grid from "../components/layout/Grid";
import Card from "../components/common/Card";

const Home = () => {
  const [featured, setFeatured] = useState<AnimeFragment[]>([]);
  const [newAnime, setNewAnime] = useState<AnimeFragment[]>([]);
  useEffect(() => {
    searchAnime({
      sort: "POPULARITY",
      page: 1,
      size: 10,
    }).then((data) => {
      if (data) {
        setFeatured(data.result);
      }
    });
  }, []);

  useEffect(() => {
    searchAnime({
      year: new Date().getFullYear(),
      page: 1,
      size: 10,
    }).then((data) => {
      if (data) {
        setNewAnime(data.result);
      }
    });
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <Container>
        <Toplist media={featured} title="Popular" />
        <h1 className="text-2xl font-bold mt-8">New</h1>
        <Grid>
          {newAnime &&
            newAnime.map((anime) => (
              <Card
                key={anime.id}
                title={anime.title}
                image={anime.coverImage}
                episode={anime.episodes}
                genres={anime.genres}
                url={`/anime/${anime.id}`}
              />
            ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
