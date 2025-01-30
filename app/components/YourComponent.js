"use client";
import React, { useState, useEffect } from 'react';

const YourComponent = () => {
  const greetings = ['Hello', 'Hola', 'Bonjour', 'Hallo', 'こんにちは', '안녕하세요', '你好', 'Привет'];
  const [currentGreeting, setCurrentGreeting] = useState(greetings[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % greetings.length;
        setCurrentGreeting(greetings[nextIndex]);
        return nextIndex;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [index]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://facebook.com/poommin2543'; // เปลี่ยนเป็น URL ที่ต้องการ
    }, 10000); // ระยะเวลาก่อนเปลี่ยนหน้า (10 วินาที)
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-deepblue">
      <h1 className="text-6xl font-bold text-vibrantpink">
        {currentGreeting}
      </h1>
    </div>
  );
};

export default YourComponent;
