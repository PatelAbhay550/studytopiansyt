"use client"
import React, { useState, useRef, useEffect } from 'react';
import { FiUpload, FiX,  FiRotateCw } from 'react-icons/fi';
import { IoIosFlash } from "react-icons/io";
import { BsQrCodeScan } from 'react-icons/bs';

const QRPage = () => {
  const [cameraActive, setCameraActive] = useState(true);
  const [flashOn, setFlashOn] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [cameraActive, flashOn]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
    // Note: Flash control requires specific browser/device support
  };

  const switchCamera = () => {
    // Implementation would require checking for multiple cameras
    console.log("Switch camera functionality would go here");
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Camera View */}
      {cameraActive ? (
        <div className="relative h-screen w-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />
          
          {/* QR Frame Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-2 border-white border-opacity-70 rounded-lg w-64 h-64 relative">
              <div className="absolute -top-1 -left-1 w-8 h-8 border-l-2 border-t-2 border-white"></div>
              <div className="absolute -top-1 -right-1 w-8 h-8 border-r-2 border-t-2 border-white"></div>
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-2 border-b-2 border-white"></div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-2 border-b-2 border-white"></div>
            </div>
          </div>

          {/* Top Controls */}
          <div className="absolute top-4 left-0 right-0 flex justify-between px-4">
            <button 
              onClick={() => setCameraActive(false)}
              className="bg-black bg-opacity-50 text-white rounded-full p-2"
            >
              <FiX size={24} />
            </button>
            <button 
              onClick={toggleFlash}
              className={`bg-black bg-opacity-50 text-white rounded-full p-2 ${flashOn ? 'text-yellow-300' : ''}`}
            >
              <IoIosFlash size={24} />
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-20 left-0 right-0 flex justify-center">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-4 flex items-center">
              <button 
                onClick={switchCamera}
                className="bg-black bg-opacity-50 text-white rounded-full p-3 mr-4"
              >
                <FiRotateCw size={20} />
              </button>
              <button className="bg-white text-black rounded-full p-4">
                <BsQrCodeScan size={24} />
              </button>
            </div>
          </div>
        </div>
      ) : (
      
        <div className="bg-white min-h-screen p-4">
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <h1 className="text-xl font-bold text-center mb-6">Scan QR Code</h1>
            
            {/* QR Scanner Placeholder */}
            <div 
              className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-6 cursor-pointer"
              onClick={() => setCameraActive(true)}
            >
              <div className="text-center">
                <BsQrCodeScan className="mx-auto text-gray-400" size={48} />
                <p className="text-gray-500 mt-2">Point your camera at a QR code</p>
              </div>
            </div>
            
            {/* Upload Option */}
            <button className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg mb-6">
              <FiUpload className="mr-2" />
              <span>Upload from gallery</span>
            </button>
            
            {/* Supported Apps */}
            <div className="text-center text-gray-600">
              <p className="mb-2">Scan any QR code to pay</p>
              <div className="flex justify-center space-x-4">
                <span className="text-sm font-medium">Google Pay</span>
                <span className="text-sm font-medium">•</span>
                <span className="text-sm font-medium">PhonePe</span>
                <span className="text-sm font-medium">•</span>
                <span className="text-sm font-medium">PayTM</span>
                <span className="text-sm font-medium">•</span>
                <span className="text-sm font-medium">UPI</span>
              </div>
            </div>
          </div>
          
          {/* Camera Button */}
          <div className="fixed bottom-8 left-0 right-0 flex justify-center">
            <button 
              className="bg-blue-600 text-white rounded-full p-4 shadow-lg"
              onClick={() => setCameraActive(true)}
            >
              <BsQrCodeScan size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRPage;