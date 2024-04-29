"use client";

import DT from "@/components/DT";
import Header from "@/components/Header";
import request from "@/components/Request";

function Trending() {
  return (
    <>
      <div>
        <Header />
        <div className="text-white pt-[70px] p-6">
          <DT link={request.Trending} />
        </div>
      </div>
    </>
  );
}

export default Trending;
