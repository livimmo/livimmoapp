interface LiveControlsProps {
  onEndStream: () => void;
}

export const LiveControls = ({ onEndStream }: LiveControlsProps) => {
  return (
    <button
      onClick={onEndStream}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
    >
      Terminer le live
    </button>
  );
};