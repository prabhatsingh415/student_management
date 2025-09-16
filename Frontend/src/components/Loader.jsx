import loaderGif from "../assets/loader.gif";

const Loader = ({ show = false }) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <img
        src={loaderGif}
        alt="Loading..."
        className="w-48 h-48 relative z-50 pointer-events-auto"
      />
    </div>
  );
};

export default Loader;
