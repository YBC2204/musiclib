"use client";
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from './Button';
interface Headerprops{
    children: React.ReactNode;
    className?: string;
}
const Header:React.FC<Headerprops> = ({children,className}) => {
    const router = useRouter();

    const handleLogout = () =>{

    }
  return (
    <div
      className={twMerge(`h-fit bg-gradient-to-b  from-blue-800 p-6`,className)}>
        <div className="w-full mb-4 flex items-center justify-between">
          <div className='hidden md:flex gap-x-2 items-center'>
        <button>
          <RxCaretLeft size={35} 
          onClick={()=>{router.back()}}
          className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          />
        </button>
        <button>
          <RxCaretRight size={35} 
          onClick={()=>{router.forward()}}
          className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          />
        </button>
          </div>
          <div className='flex md:hidden gap-x-2 items-center'>
          <button 
            onClick={() => router.push('/')} 
            className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button 
            onClick={() => router.push('/search')} 
            className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >
            <BiSearch className="text-black" size={20} />
          </button>
          </div>
          <div className="flex justify-between items-center gap-x-4">
           <div className='flex gap-x-4 items-center'>
            <Button onClick={() => { }} 
            className=' bg-transparent 
                    
                    font-medium'>
              SignUp
            </Button>
            <Button  onClick={() => { }}
            className=' bg-black 
                    px-6
                    py-2'>
              Login
            </Button>
            
           </div>
          
          </div>
          </div>
          {children}
          </div>
  )
}

export default Header