import Image from "next/image";
function BannerImage({ imageURL }: { imageURL: any }) {
  return (
    <div className="w-screen absolute">
      <div className="bg-gradient-to-t from-background from-10% to-transparent absolute h-[280px] w-screen z-10 inset-0"></div>

      <Image
        height={650}
        width={540}
        className="object-cover bg-image blur-[2px] w-screen absolute top-0 left-0 h-[250px] brightness-[55%] z-0"
        src={imageURL}
        alt="banner image"
      />
    </div>
  );
}

export default BannerImage;
