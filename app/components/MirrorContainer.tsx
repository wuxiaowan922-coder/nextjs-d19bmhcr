"use client"
import { useEffect, useRef } from 'react';
export function MirrorContainer({ active }: { active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (active) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
        .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
        .catch(err => console.error("無法開啟相機", err));
    }
  }, [active]);
  return <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />;
}