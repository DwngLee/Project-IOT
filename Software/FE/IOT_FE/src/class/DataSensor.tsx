// DataSensor.ts
interface DataSensor {
  id: string;
  temperature: number;
  humidity: number;
  light: number;
  dust: number;
  created_at: Date;
}

export default DataSensor;
