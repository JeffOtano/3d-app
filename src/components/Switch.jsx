export const Switch = ({ checked, onChange }) => {
  return (
    <div onClick={() => onChange(!checked)} className="flex flex-col">
      {checked ? (
        <span className="border rounded-full border-grey bg-green-500 flex items-center cursor-pointer w-12 justify-end">
          <span className="rounded-full border w-6 h-6 border-grey bg-white shadow" />
        </span>
      ) : (
        <span className="border rounded-full border-grey flex items-center cursor-pointer w-12 justify-start">
          <span className="rounded-full border w-6 h-6 border-grey bg-white shadow" />
        </span>
      )}
    </div>
  );
};
