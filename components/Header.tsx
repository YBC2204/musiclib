"use client";
import { useRouter } from 'next/navigation';


interface Headerprops{
    children: React.ReactNode;
    className?: string;
}
const Header:React.FC<Headerprops> = ({children,className}) => {
    const router = useRouter();

    const handleLogout = () =>{

    }
  return (
    <div>Header</div>
  )
}

export default Header