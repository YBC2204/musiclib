import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"
interface Buttonprops extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

const Button = forwardRef<HTMLButtonElement,Buttonprops>(({
    className,
    children,
    disabled,
    type="button",
    ...props
},ref)=>
{
    return(
        <button
      type={type}
      className={twMerge(
        `
        w-full 
        rounded-full 
        bg-black
        border
        border-transparent
        px-3 
        py-3 
        disabled:cursor-not-allowed 
        disabled:opacity-50
        
        font-bold
        hover:opacity-75
        transition
      `,
        disabled && 'opacity-75 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >{children}
        </button>
    )
})
 
Button.displayName="Button";
export default Button