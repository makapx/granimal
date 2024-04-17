import { useSelector } from "react-redux";
import { StoreType, listSelector, selectUser } from "../store";
import { HashLink } from "react-router-hash-link";
import Header from "../components/layout/Header";

import bannerImage from "../../assets/laputa.webp";
import profileImage from "../../assets/john wick.webp";
import { useEffect, useState } from "react";
import { AnimeFragment } from "../api/types";
import { TrackingList } from "../api/types/tracking-list";
import { searchAnimeUsingPost } from "../api/anime.api";
import { Link } from "react-router-dom";
import ImageCard from "../components/common/ImageCard";
import Loading from "../components/common/Loading";

type Data = Array<{
  status: string,
  list: Array<TrackingList & { fragment: AnimeFragment }>
}>;


async function fetchAndTransformData(list: Array<TrackingList>) {
  const ids = list.map(e => e.animeId);

  // eseguo quello che su lodash si chiama mapKey
  const animes: Record<number, AnimeFragment> = (await searchAnimeUsingPost({ ids, size: 999 })).result.reduce(
    (dict, anime) => ({ ...dict, [anime.id]: anime }), {}
  );

  const result: Data = [
    { status: 'Watching', list: list.flatMap(el => el.status === 'Watching' ? [{ ...el, fragment: animes[el.animeId] }] : []) },
    { status: 'Completed', list: list.flatMap(el => el.status === 'Completed' ? [{ ...el, fragment: animes[el.animeId] }] : []) },
    { status: 'Pending', list: list.flatMap(el => el.status === 'Pending' ? [{ ...el, fragment: animes[el.animeId] }] : []) },
    { status: 'Paused', list: list.flatMap(el => el.status === 'Paused' ? [{ ...el, fragment: animes[el.animeId] }] : []) },
    { status: 'Dumped', list: list.flatMap(el => el.status === 'Dumped' ? [{ ...el, fragment: animes[el.animeId] }] : []) }
  ];

  return result.filter(e => e.list.length > 0);
}

export default function ProfilePage() {
  const user = useSelector(selectUser);
  const list = useSelector<StoreType, TrackingList[]>(state => listSelector.selectAll(state.list));

  const [data, setData] = useState<Data | undefined>(undefined);

  useEffect(() => {
    if (list.length > 0)
      fetchAndTransformData(list).then(setData)
    else {
      setData([]);
    }
  }, [list])

  return (<>
    <Header />
    <div className="relative">
      <img src={bannerImage} className="h-96 w-full object-cover object-bottom" alt="" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
    { data !== undefined && (<>
        <div className="container mx-auto grid grid-cols-12 gap-6">
          <div className="flex flex-col gap-1 col-span-12 md:col-span-4 lg:col-span-3">
            <div className="relative h-12">
              <div className="absolute bottom-0 w-full">

                <div className="w-1/2 rounded-full overflow-clip mx-auto">
                  <img

                    alt="Tailwind CSS Navbar component"
                    src={profileImage}
                  />
                </div>
              </div>
            </div>
            <div className=" p-2 sm:p-0 md:col-span-8 lg:col-span-9">
              <h1 className="my-3.5 font-bold text-3xl text-center" >{user?.username ?? 'Anonimo'}</h1>
            </div>
            {data?.length !== 0 && <div className=" flex flex-col gap-4 bg-primary-content/30  p-4 rounded">

              {data?.map(({ list, status }, id) => (
                <HashLink key={id} className="link link-primary" to={'#' + status}>{status} ({list.length})</HashLink>
              ))}
            </div>}
          </div>



          {data.length !== 0 && (
            <div className="col-span-12 md:col-span-8 lg:col-span-9 my-4">
              {data?.map(({ list, status }, id) => (<section key={id}>
                <HashLink to={'#' + status} id={status} className="font-bold mb-2 mt-4 link link-primary no-underline flex gap-2 items-center" >
                  <i >#</i> {status}
                </HashLink>
                <div className="grid grid-cols-6 m-2 gap-4 md:gap-2 grid-auto-rows">
                  {
                    list.map(({fragment: anime, progress }) =>
                      <Link key={anime.id} to={'/anime/' + anime.id} className="col-span-3 md:col-span-2 lg:col-span-1">
                        <ImageCard imgsrc={anime.coverImage}>
                        <p className="text-sm font-bold">{anime.title}</p>
                        <p className="text-xs ">Episode {progress} of {anime.episodes}{anime.status === 'RELEASING' && '+'}</p>
                        </ImageCard>
                      </Link>)
                  }
                </div>
              </section>))}
            </div>)
          }
          {data.length === 0 && <> <span className="my-4 text-center col-span-12 text-2xl font-bold"> La tua lista è vuota.</span> </>}
        </div>
      </>)
    }
    { data === undefined && (<Loading/>)}
  </>)
}