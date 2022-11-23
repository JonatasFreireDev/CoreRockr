import { Card, CardImgRight } from "../components";
import { IPostsProps, usePosts } from "../services";
import { useEffect, useRef, useState } from "react";

import { PuffLoader } from "react-spinners";
import { useOberser } from "../hooks/useOberser";

export default function Main() {
  const loader = useRef<HTMLDivElement>(document.createElement("div"));
  const [page, setPage] = useState(0);
  const [realyPage, setRealyPage] = useState(0);
  const [pageData, setPageData] = useState<Array<Array<IPostsProps>>>([]);
  const { isEntry } = useOberser(loader);

  const { data, isLoading, isFetching } = usePosts({
    page,
  });

  useEffect(() => {
    if (isEntry) setPage((old) => old + 1);
  }, [isEntry]);

  useEffect(() => {
    if (data) {
      for (const item of data) {
        if (JSON.stringify(pageData).includes(String(item.id))) return;
      }
    }

    if (data) {
      setPageData((old) => [...old, [...data]]);
      setRealyPage((old) => old + 1);
      setPage(realyPage);
    }
  }, [data]);

  return (
    <>
      {pageData.map((data) => {
        return (
          <div
            className="mt-14"
            key={page + data[0].id + new Date().getSeconds()}
          >
            <section className="flex flex-auto mt-14 md:flex-col md:justify-center md:items-center">
              <Card {...data[0]} appearFrom="appearFromLeft" />
              <Card {...data[1]} appearFrom="appearFromLeft" />
            </section>

            <section className="flex flex-auto mt-14 justify-end md:flex-col md:justify-center md:items-center">
              <Card
                {...data[2]}
                size="lg"
                classRoot="max-w-[75%]"
                appearFrom="appearFromLeft"
              />
            </section>

            <section className="flex flex-auto mt-14 md:flex-col md:justify-center md:items-center">
              <CardImgRight {...data[3]} appearFrom="appearFromRight" />
              <CardImgRight {...data[4]} appearFrom="appearFromRight" />
            </section>

            <section className="flex flex-auto mt-14 md:flex-col md:justify-center md:items-center">
              <Card
                {...data[5]}
                size="lg"
                classRoot="max-w-[75%]"
                appearFrom="appearFromRight"
              />
            </section>
          </div>
        );
      })}

      {(isFetching || isLoading) && (
        <div className="flex justify-center items-center w-full h-60">
          <PuffLoader />
        </div>
      )}

      <div ref={loader} />
    </>
  );
}
