"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {FaPlay} from 'react-icons/fa'
interface ListProps{
  image:string;
  name:string;
  href:string;
}

const ListItem: React.FC<ListProps>= ({image,name,href}) => {
  const router =useRouter();
  const onClick = () =>{
    //add auth
    router.push(href);
  }
    return (
        <button
        onClick={onClick}
        className="
          relative 
          group 
          flex 
          items-center 
          rounded-md 
          overflow-hidden 
          gap-x-4 
          bg-neutral-100/10 
          cursor-pointer 
          hover:bg-neutral-100/20 
          transition 
          pr-4
          min-w-[250px]
          max-w-[300px]
        "
      >
        <div className="relative min-h-[64px] min-w-[64px] ">
        <Image
          className="object-cover"
          src={image}
          fill
          alt="Image"
        />
        </div>
     <p className="py-5 truncate font-semibold">{name}</p>
     <div className="absolute 
          transition 
          opacity-0 
          rounded-full 
          flex 
          items-center 
          justify-center 
          bg-blue-700 
          text-black
          p-4 
          drop-shadow-md 
          right-2
          group-hover:opacity-100 
          hover:scale-110">
        <FaPlay/>
     </div>
    </button>
  )
}

export default ListItem