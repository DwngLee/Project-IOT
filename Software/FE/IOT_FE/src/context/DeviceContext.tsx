import React, { createContext, useState, useContext, ReactNode } from "react";

interface DeviceContextType {
  lightState: string;
  fanState: string;
  setDeviceState: (device: string, state: string) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const [lightState, setLightState] = useState<string>("off");
  const [fanState, setFanState] = useState<string>("off");

  const setDeviceState = (device: string, state: string) => {
    if (device === "den") {
      setLightState(state);
    } else if (device === "quat") {
      setFanState(state);
    }
  };

  return (
    <DeviceContext.Provider value={{ lightState, fanState, setDeviceState }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = (): DeviceContextType => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDeviceContext must be used within a DeviceProvider");
  }
  return context;
};
