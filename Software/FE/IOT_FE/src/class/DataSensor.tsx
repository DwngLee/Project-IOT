// DataSensor.ts
interface DataSensor {
  id: string;
  temperature: number;
  humidity: number;
  light: number;
  created_at: Date;
}

export default DataSensor;
