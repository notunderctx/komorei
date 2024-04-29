import Image from "next/image";
import React, { useState } from "react";
import Modal from "react-modal";

const Poster = ({ imageUrl }: { imageUrl: any }) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <button
        type="button"
        className="shrink-0 w-[180px] h-[250px] rounded overflow-hidden relative group">
        <div className="absolute inset-0 flex w-full h-full bg-black group-hover:bg-opacity-50 bg-opacity-0 duration-300 text-white transition-all ease-out items-center justify-center">
          <svg
            viewBox="0 0 32 32"
            className="size-10 scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 duration-300 transition-all ease-out vds-icon"
            fill="none"
            onClick={() => setModal(true)}
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.3183 12.4856L21.2231 8.58073C21.3071 8.49674 21.2476 8.35312 21.1288 8.35312H18.0189C17.6507 8.35312 17.3522 8.05464 17.3522 7.68645V5.95312C17.3522 5.58493 17.6507 5.28645 18.0189 5.28645H26.0189C26.387 5.28645 26.6862 5.58493 26.6862 5.95312V13.9531C26.6862 14.3213 26.3877 14.6198 26.0196 14.6198H24.2862C23.918 14.6198 23.6196 14.3213 23.6196 13.9531V10.8431C23.6196 10.7243 23.4759 10.6648 23.3919 10.7488L19.4867 14.6541C19.2264 14.9144 18.8043 14.9144 18.5439 14.6541L17.3183 13.4284C17.0579 13.1681 17.0579 12.7459 17.3183 12.4856Z"
              fill="currentColor"></path>
            <path
              d="M6.1153 26.7135H14.1153C14.4835 26.7135 14.782 26.4151 14.782 26.0469V24.3135C14.782 23.9453 14.4835 23.6469 14.1153 23.6469H11.0053C10.8865 23.6469 10.827 23.5033 10.911 23.4193L14.8159 19.5144C15.0763 19.254 15.0763 18.8319 14.8159 18.5716L13.5903 17.3459C13.3299 17.0856 12.9078 17.0856 12.6474 17.3459L8.74222 21.2512C8.65822 21.3351 8.5146 21.2757 8.5146 21.1569L8.51461 18.0469C8.51461 17.6787 8.21613 17.3802 7.84794 17.3802H6.11461C5.74642 17.3802 5.44794 17.6787 5.44794 18.0469V26.0469C5.44794 26.4151 5.74711 26.7135 6.1153 26.7135Z"
              fill="currentColor"></path>
          </svg>
        </div>
        <Image
          alt="poster anime"
          width="300"
          height="300"
          className="w-full h-full object-cover"
          src={imageUrl}
          style={{ color: "transparent" }}
        />
      </button>
    </>
  );
};

export default Poster;
