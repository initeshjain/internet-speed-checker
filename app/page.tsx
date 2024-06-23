'use client';

import { useState } from 'react';
import { checkDownloadSpeed, checkUploadSpeed } from './lib/speedTest';

interface SpeedData {
  download?: number;
  upload?: number;
  error?: string;
}

const Home: React.FC = () => {
  const [speedData, setSpeedData] = useState<SpeedData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const checkSpeed = async () => {
    setLoading(true);
    setSpeedData(null);

    try {
      const downloadSpeedBps = await checkDownloadSpeed();
      const uploadSpeedBps = await checkUploadSpeed();
      setSpeedData({
        download: downloadSpeedBps,
        upload: uploadSpeedBps,
      });
    } catch (error: any) {
      console.error('Error checking speed:', error);
      setSpeedData({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Check Internet Speed</h1>
        <button
          onClick={checkSpeed}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'}`}
        >
          {loading ? 'Checking...' : 'Check Speed'}
        </button>
        {speedData && (
          <div className="mt-6">
            {speedData.error ? (
              <p className="text-red-500">Error: {speedData.error}</p>
            ) : (
              <div>
                {speedData.download && <p className="text-lg">Download Speed: <span className="font-semibold">{(speedData.download / (1024 * 1024)).toFixed(2)} Mbps</span></p>}
                {speedData.upload && <p className="text-lg">Upload Speed: <span className="font-semibold">{(speedData.upload / (1024 * 1024)).toFixed(2)} Mbps</span></p>}
                {speedData.error && <p className="text-lg">Error: <span className="font-semibold">{speedData.error}</span></p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;