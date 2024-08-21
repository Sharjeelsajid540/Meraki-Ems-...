export default function Loader() {
  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[9999]">
        <div className="animate-spin">
          <img className="w-16 h-16" src="/sideNAvebar-icon.png" alt="Loader" />
        </div>
      </div>
    </>
  );
}
