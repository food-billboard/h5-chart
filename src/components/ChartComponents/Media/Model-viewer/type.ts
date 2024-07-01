export type TModelConfig = {
  rotate: {
    show: boolean;
    speed: number;
    delay: number;
  };
  cameraControls: boolean;
  position: {
    x: number;
    y: number;
    z: number;
  };
  animation: {
    name: string;
  };
  scale: number;
};
