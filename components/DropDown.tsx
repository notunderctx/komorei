import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTv,
  faClosedCaptioning,
  faStar,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

interface DropDownProps {
  isVisible: boolean;
}
/* eslint-disable */

const DropdownContainer = styled.div<{ isvisible: boolean }>`
  display: ${(props) => (props.isvisible ? "block" : "none")};
  position: absolute;
  position:fixed
  top: 90%;
  width: 44.5rem;
  margin-left: -0.6rem;
  overflow-y: auto;
  background-color: var(--global-input-div);
  border: 1px solid var(--global-input-border);
  border-radius: 1rem;
  @media (max-width: 1000px) {
    max-width: 60%;
  }
  @media (max-width: 500px) {
    max-width: 95%;
    top: 179%;
  }
  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari/Opera */
  }
`;

const StyledButton = styled(Button)`
  background-color: #6b46c1;
  width: 24rem;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem;
  cursor: pointer;
  background-color: ${(props: any) =>
    props.isSelected ? "var(--primary-accent-bg)" : "transparent"};

  &:hover {
    background-color: var(--primary-accent-bg);
  }
`;

const AnimeImage = styled.img`
  margin-left: 0.2rem;
  width: 3rem;
  height: 4rem;
  border-radius: var(--global-border-radius);
  object-fit: cover;
  @media (max-width: 500px) {
    width: 2rem;
    height: 3rem;
  }
`;

const AnimeTitle = styled.div`
  margin: 0.25rem;
  text-align: left;
  overflow: hidden;
  font-size: 0.9rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

const AnimeDetails = styled.p`
  font-size: 0.6rem;
  margin: 0rem;
  margin-top: 0.5rem;
  display: flex;
  p {
    margin: 0rem;
  }
`;

const AnimeDropdown: React.FC<{
  anime: any[];
  truncate: (str: string, maxlength: number) => string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string | undefined;
}> = ({ anime, truncate, isVisible, setIsVisible, className }) => {
  const dropdownRef: any = useRef(null);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <DropdownContainer
      isvisible={isVisible}
      ref={dropdownRef}
      className={className}>
      {anime.slice(0, 5).map((anime, index) => (
        <ResultItem key={anime.id}>
          <AnimeImage
            src={anime?.image}
            alt={anime?.title?.english || "anime cover"}
            className="p-2"
            height={60}
            width={60}
          />
          <AnimeTitle>
            <strong className="hover:text-orange-400 text-ellipsis font-black">
              {truncate(anime?.title?.english, 30) ||
                truncate(anime?.title?.romaji, 30) ||
                anime?.title?.native}
            </strong>
            <div className="gap-1 h-5">
              <p className="text-slate-500 font-light">
                {anime.releaseDate || "..."},
              </p>
              <p className="text-slate-100 font-bold">{anime.type}</p>
            </div>
          </AnimeTitle>
        </ResultItem>
      ))}
      <StyledButton size={"lg"}>View All results</StyledButton>
    </DropdownContainer>
  );
};

export default AnimeDropdown;
/* eslint-disable */
