import { useEffect, useState } from 'react';

const useCountdown = (totalTime) => {
  // const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    totalTime
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  const minutes = Math.floor((countDown / (60)));
  const seconds = countDown % 60;
  return [minutes, seconds];
};

export { useCountdown };
