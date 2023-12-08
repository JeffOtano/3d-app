import { Inter } from "next/font/google";
import { ScapulaSphere } from "@/components/ScapulaSphere";
import { useEffect, useState } from "react";
import { DirectionControl } from "@/components/DirectionControl";
import { Switch } from "@/components/Switch";

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
  const [orbitControl, setOrbitControl] = useState(false);

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
        <div className="flex flex-col text-white text-lg gap-2 p-5 border rounded-lg lg:mt-2 justify-between items-center">
          {/* Controls for X, Y, Z axis */}
          {directions.map((direction) => (
            <DirectionControl
              direction={direction}
              adjustPosition={adjustPosition}
            />
          ))}
          <div className="flex items-center">
            <p className="mr-2 w-40">Orbit controls</p>
            <Switch checked={orbitControl} onChange={setOrbitControl} />
          </div>
        </div>
        <div className="flex w-full items-center justify-center lg:mt-10">
          <ScapulaSphere
            x={xInSceneUnits}
            y={yInSceneUnits}
            z={zInSceneUnits}
            screenScale={screenScale}
            orbitControl={orbitControl}
          />
        </div>
      </div>
    </main>
  );
}
