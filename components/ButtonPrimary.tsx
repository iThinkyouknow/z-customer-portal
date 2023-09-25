export const ButtonPrimary = ({children, onClick}: ButtonPrimaryProps) => {
    return (
      <button 
        className="rounded-lg bg-blue-500 h-full w-full text-white hover:bg-blue-400 hover:shadow-md px-4" 
        onClick={onClick}
      >
        {children}
      </button>
  );
}