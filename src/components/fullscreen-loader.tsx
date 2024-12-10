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
      className={`flex flex-col items-center justify-center min-h-screen ${className}`}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      {label && <p className="mt-4 text-gray-700">{label}</p>}
    </div>
  );
};
