import Header from "../components/layout/Header";
import Hero from "../components/pages/home/Hero";
import Container from "../components/layout/Container";
import { useEffect, useState } from "react";
import Toplist from "../components/common/Toplist";
import { AnimeFragment } from "../api/types";
import { searchAnime } from "../api/anime.api";
import Footer from "../components/layout/Footer";

const Home = () => {
  const [featured, setFeatured] = useState<AnimeFragment[]>([]);
  useEffect(() => {
    searchAnime(
      {
        sort: "POPULARITY",
        page: 1,
        size: 10,
      }
    ).then((data) => {
      if (data) {
        setFeatured(data.result);
      }
    }
    );
  } , []);


  return (
    <>
      <Header />
      <Hero />
      <Container>
        <Toplist media={featured} title="Popular"/>

      </Container>
      <Footer />
    </>
  );
};

export default Home;