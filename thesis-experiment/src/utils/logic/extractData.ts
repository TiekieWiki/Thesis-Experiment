import { getData } from '../db';
import type { Measurement } from '../types/measurements';

/**
 * Extract data from a database table and write it to a CSV file
 * @param table The database table to extract data from
 */
export async function extractData(table: string): Promise<void> {
  const rawData = await getData(table);
  const keys = Object.keys(rawData[0]);
  const data = [keys, ...rawData.map(value => keys.map(key => value[key]))];
  writeToCSV(data);
}

/**
 * Extract measurements from a database table and write it to a CSV file
 */
export async function extractMeasurements(): Promise<void> {
  const rawData = await getData('measurements');
  const redefinedData = rawData.flatMap(
    ({ userId, taskSet, task, measurements }) =>
      measurements.map((measurement: Measurement) => ({
        ...measurement,
        userId,
        taskSet,
        task,
      })),
  );

  const keys = Object.keys(redefinedData[0]);
  const data = [
    keys,
    ...redefinedData.map(value => keys.map(key => value[key])),
  ];

  writeToCSV(data);
}

/**
 * Write data to a CSV file
 * @param data Data to write to a CSV file
 */
export function writeToCSV(data: unknown[][]): void {
  // Convert data to CSV format
  let csvContent = '';
  data.forEach(row => {
    csvContent += row.join(',') + '\n';
  });

  // Create a CSV file and download it
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
  const objUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', objUrl);
  link.setAttribute('download', 'File.csv');

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
