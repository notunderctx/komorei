import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function Embed({
  anime,
  episodeNumber,
  type,
  id,
}: {
  anime: string | null;
  episodeNumber: string | any;
  type: string | any | "sub" | "dub";
  id?: string | any;
}) {
  const [iframeHeight, setIframeHeight] = useState("450");
  const [iframeWidth, setIframeWidth] = useState("700");
  const [VideoTagWH, setVideoTagWH] = useState("800");
  const [uRl, setURL] = useState("");

  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    let url = `/episode?anime=${anime}&episode=${episodeNumber}&id=${id}&type=${type}`;
    setURL(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  return (
    <iframe
      style={{
        width: "90%",
        maxWidth: "834px",
        height: "449.13px",
      }}
      className=" no-scrollbar  w-full"
      src={
        uRl ||
        `/episode?anime=${anime}&episode=${episodeNumber}&id=${id}&type=${type}`
      }></iframe>
  );
}

export default Embed;
