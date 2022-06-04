import {useEffect, useState} from 'react';
import bridge from "@vkontakte/vk-bridge";

const useCountdown = (totalTime) => {
  // const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    totalTime
  );

  useEffect(() => {
    const interval = setInterval(async () => {
      setCountDown(countDown - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countDown]);

  useEffect(async () => {
    if (0 < countDown && countDown <= 60) {
      const response = await bridge.send("VKWebAppFlashGetInfo");
      if (response.is_available) {
        if (countDown % 2 === 1) {
          await bridge.send("VKWebAppFlashSetLevel", {"level": 1});
        } else {
          await bridge.send("VKWebAppFlashSetLevel", {"level": 0});
        }
      }
    } else {
      await bridge.send("VKWebAppFlashSetLevel", {"level": 0});
    }
  }, [countDown]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  const minutes = Math.floor((countDown / (60)));
  const seconds = countDown % 60;
  return [minutes, seconds];
};

export {useCountdown};
