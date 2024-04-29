import React from "react";
import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

interface CharacterProps {
  info: Object[] | any[];
}

const CharactersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: auto;
  max-width: 100%; /* Ensures the container can scroll horizontally */
  height: 250px; /* Set a fixed height for the container */
`;

const ShowMoreButton = styled.div`
  cursor: pointer;
  font-family: "Karla", sans-serif;
`;

const CharacterCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CharactersGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex: 0 0 auto; /* Allow the grid to shrink to fit its content */
  padding: 0 1rem; /* Add padding to avoid overflow on the sides */
  /* Ensure each character card is not wider than its content */
  & > ${CharacterCard} {
    flex: 0 0 auto;
  }
`;

const CharacterImage = styled(Image)`
  width: 160px;
  height: 192px;
  border-radius: 8px;
  overflow: hidden;
`;

const CharacterName = styled.p`
  font-family: "Karla", sans-serif;
  font-size: 1rem;
  text-align: center;
  margin-top: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Characters: React.FC<CharacterProps> = ({ info }) => {
  const [showAll, setShowAll] = useState(false);
  const characterInfo = Array.isArray(info) ? info : [];

  return (
    <CharactersContainer>
      <div className="flex justify-between items-center w-full px-5">
        {characterInfo?.length > 6 && (
          <ShowMoreButton onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : "Show more"}
          </ShowMoreButton>
        )}
      </div>

      {/* For larger devices */}
      <CharactersGrid>
        {characterInfo
          ?.slice(0, showAll ? characterInfo?.length : 6)
          ?.map((item: any, index: number) => (
            <CharacterCard key={index}>
              <a className="group relative hover:scale-105 hover:shadow-lg duration-300 ease-out">
                {item?.image != null ? (
                  <CharacterImage
                    src={item?.image || ""}
                    alt={"Character Image"}
                    width={160}
                    height={192}
                    className="object-cover"
                  />
                ) : (
                  <CharacterImage
                    src={
                      "data:image/jpeg;base64,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"
                    }
                    alt={"Character Image"}
                    width={160}
                    height={192}
                    className="object-cover"
                  />
                )}
              </a>
              <CharacterName>{item?.name || ""}</CharacterName>
            </CharacterCard>
          ))}
      </CharactersGrid>
    </CharactersContainer>
  );
};

export default Characters;
