import { Inter } from "next/font/google";
import { ScapulaSphere } from "@/components/ScapulaSphere";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const directions = [
  {
    name: "Medial/Lateral",
    axis: "x",
  },
  {
    name: "Superior/Inferior",
    axis: "y",
  },
  {
    name: "Anterior/Posterior",
    axis: "z",
  },
];

export default function Home() {
  const [x, setX] = useState(50);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [screenScale, setScreenScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const screenScale = Math.min(width / 720, height / 1080);
      setScreenScale(screenScale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenScale, screenScale]);

  const adjustPosition = (axis, delta) => {
    if (axis === "x") setX((x) => x + delta);
    if (axis === "y") setY((y) => y + delta);
    if (axis === "z") setZ((z) => z + delta);
  };

  // Convert millimeters to scene units (assuming 1 unit = 1mm)
  const xInSceneUnits = x * 0.05 * screenScale;
  const yInSceneUnits = y * 0.05 * screenScale;
  const zInSceneUnits = z * 0.05 * screenScale;

  return (
    <main className={`min-h-screen ${inter.className}`}>
      <div className="w-screen h-screen items-center flex flex-col-reverse lg:flex-col bg-black">
        <div className="flex flex-col text-lg gap-2 p-5 border rounded-lg m-2 w-fit">
          {/* Controls for X, Y, Z axis */}
          {directions.map((direction) => (
            <div key={direction.axis} className="flex text-white items-center">
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
          ))}
        </div>
        <div className="flex w-full h-full items-center justify-center lg:mt-10">
          <ScapulaSphere
            x={xInSceneUnits}
            y={yInSceneUnits}
            z={zInSceneUnits}
            screenScale={screenScale}
          />
        </div>
      </div>
    </main>
  );
}
