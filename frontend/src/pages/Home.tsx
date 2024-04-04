import Header from "../components/layout/Header";
import Hero from "../components/pages/home/Hero";
import getFeatured from "../api/getFeatured";
import Container  from "../components/layout/Container";
import { useEffect, useState } from "react";
import Card from "../components/common/Card";

const Home = () => {
  const [featured, setFeatured] = useState([
    {
      id: 0,
      title: "",
      description: "",
      image: "",
      genres: [""]
    },
  ]);
  useEffect(() => {
    const fetchFeatured = async () => {
      const data = await getFeatured();
      setFeatured(data);
    };
    fetchFeatured();
  }, []); 
    

  return (
    <>
      <Header />
      <Hero />
      <Container children={
        featured.map((item) => (
          <Card key={item.id} title={item.title} image={item.image} genres={item.genres} />
        ))
      } />
    </>
  );
};

export default Home;
