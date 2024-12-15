import { RiProgress1Line } from "react-icons/ri";

interface FullscreenLoaderProps {
  label?: string;
  className?: string;
}

export const FullscreenLoader = ({
  label,
  className,
}: FullscreenLoaderProps) => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url('/background.svg')`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`relative z-10 flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg ${className}`}
      >
        <div className="animate-spin ">
          <RiProgress1Line className="text-indigo-600 size-10" />
        </div>
        {label && <p className="mt-4 text-gray-700">{label}</p>}
      </div>
    </div>
  );
};
