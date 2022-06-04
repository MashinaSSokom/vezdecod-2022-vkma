import React from 'react';
import { useCountdown } from '../hooks/useCountDown';
import {Div} from "@vkontakte/vkui";

const ExpiredNotice = () => {
  return (
    <Div>
      <p>Время вышло!</p>
    </Div>
  );
};

const ShowCounter = ({minutes, seconds }) => {
  return (
    <Div className="show-counter">
          <p>{`Найдите шпиона! У вас осталось ${minutes} мин ${seconds} сек`}</p>
    </Div>
  );
};

const Timer = ({ totalTime }) => {
  const [minutes, seconds] = useCountdown(totalTime);

  if (minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default Timer;
