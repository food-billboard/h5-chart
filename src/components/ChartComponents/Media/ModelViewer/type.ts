export type TModelConfig = {
  progress: {
    from: ComponentData.TColorConfig;
    to: ComponentData.TColorConfig;
  };
  rotate: {
    show: boolean;
    speed: number;
    delay: number;
  };
  cameraControls: {
    show: boolean;
  };
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
