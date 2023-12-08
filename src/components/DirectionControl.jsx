export const DirectionControl = ({ direction, adjustPosition }) => {
  return (
    <div key={direction.axis} className="flex items-center">
      <label className="mr-2 w-40">{direction.name}</label>
      <button
        className="border rounded w-10 flex h-10 items-center justify-center"
        onClick={() => adjustPosition(direction.axis, -5)}
      >
        -
      </button>
      <button
        className="border rounded w-10 ml-2 flex h-10 items-center justify-center"
        onClick={() => adjustPosition(direction.axis, 5)}
      >
        +
      </button>
    </div>
  );
};
