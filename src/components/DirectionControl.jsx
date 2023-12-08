export const DirectionControl = ({ direction, adjustPosition }) => {
  return (
    <div key={direction.axis} className="flex items-center">
      <label className="mr-2 w-40">{direction.name}</label>
      <button
        className="border rounded bg-slate-700 shadow-white w-10 flex h-10 items-center justify-center"
        onClick={() => adjustPosition(direction.axis, -5)}
      >
        {direction.incrementIcon}
      </button>
      <button
        className="border rounded bg-slate-700 shadow-white w-10 flex h-10 items-center justify-center ml-2"
        onClick={() => adjustPosition(direction.axis, 5)}
      >
        {direction.decrementIcon}
      </button>
    </div>
  );
};
