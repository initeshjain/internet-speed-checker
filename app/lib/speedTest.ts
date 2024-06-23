export const checkDownloadSpeed = async (): Promise<number> => {
  const fileSizeInBytes = 5000000; // 5MB
  const data = new Uint8Array(fileSizeInBytes);
  const blob = new Blob([data]);
  const url = URL.createObjectURL(blob);

  const startTime = new Date().getTime();
  const response = await fetch(url);
  await response.blob();
  const endTime = new Date().getTime();

  URL.revokeObjectURL(url);

  const durationInSeconds = (endTime - startTime) / 1000;
  const bitsLoaded = fileSizeInBytes * 8;
  const speedBps = bitsLoaded / durationInSeconds;
  return speedBps;
};

export const checkUploadSpeed = async (): Promise<number> => {
  const fileSizeInBytes = 5000000; // 5MB
  const data = new Blob([new Uint8Array(fileSizeInBytes)], { type: 'application/octet-stream' });
  const startTime = new Date().getTime();
  await fetch('/api/upload-test', {
    method: 'POST',
    body: data,
  });
  const endTime = new Date().getTime();

  const durationInSeconds = (endTime - startTime) / 1000;
  const bitsLoaded = fileSizeInBytes * 8;
  const speedBps = bitsLoaded / durationInSeconds;
  return speedBps;
};
