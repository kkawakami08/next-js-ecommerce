"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImagesProps {
  images: string[];
}

const ProductImages = ({ images }: ProductImagesProps) => {
  const [currentImg, setCurrentImg] = useState(0);

  return (
    <div className=" space-y-4 ">
      <Image
        src={images[currentImg]}
        alt="product image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center"
      />
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setCurrentImg(index)}
            className={cn(
              "border mr-2 cursor-pointer hover:border-orange-600",
              currentImg === index && "border-orange-500"
            )}
          >
            <Image
              src={image}
              alt={`Image ${index}`}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
