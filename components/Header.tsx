"use client";
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from 'react-icons/fa';


interface Headerprops{
    children: React.ReactNode;
    className?: string;
}
const Header:React.FC<Headerprops> = ({children,className}) => {
    const router = useRouter();
    
    const authModal = useAuthModal();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async() =>{
      const { error } = await supabaseClient.auth.signOut();
      router.refresh();
      if (error) {
        console.log(error.message);
      }
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
           
           {user ? 
           (<div className='flex gap-x-4 items-center'>
           <Button 
             onClick={handleLogout} 
             className="bg-black px-6 py-2"
           >
             Logout
           </Button>
           <Button 
            
           className="bg-black"
         >
           <FaUserAlt />
         </Button>
         </div>):
           (
           
            <>
            <div>
             <Button onClick={authModal.onOpen} 
                className=' bg-transparent font-medium'>
              SignUp
             </Button>
            </div>
            <div>
            <Button  onClick={authModal.onOpen}
            className=' bg-black px-6 py-2'>
              Login
            </Button>
            </div>
          </>)}
           
            
            
           </div>
          
          </div>
          </div>
          {children}
          </div>
  )
}

export default Header