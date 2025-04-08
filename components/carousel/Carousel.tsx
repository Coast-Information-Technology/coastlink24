import { Carousel } from "flowbite-react";
import Image from "next/image";

export const CarouselComponent = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <Image src="/partners/AssestLend.png" alt="logo3" width={100} height={100} />
        <Image src="/partners/Coast.jpeg" alt="logo2" width={100} height={100} />
        <Image src="/partners/coastin.png" alt="..." width={100} height={100} />
        <Image src="/partners/Coastlink24.png" alt="..." width={100} height={100} />
        <Image src="Lend.jpeg" alt="..." width={100} height={100} />
      </Carousel>
    </div>
  );
}
