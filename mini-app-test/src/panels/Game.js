import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {Button, Card, FormItem, Group, Input, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';

import persik from '../img/persik.png';
import './Persik.css';

const Game = ({locations, ...props}) => {

  const [location, setLocation] = useState({})
  const [isStarted, setIsStarted] = useState(false)
  const [numberOfPlayers, setNumberOfPlayers] = useState(2)
  const [cards, setCards] = useState([])
  const [tempPlayer, setTempPlayer] = useState(0)
  const [waitNextPlayer, setWaitNextPlayer] = useState(false)

  useEffect(async () => {
    let randomLoc = locations[Math.floor(Math.random() * locations.length)]
    setLocation(randomLoc)
  }, [location])
  const startGame = () => {
    let tempCards = []
    for (let i = 0; i < numberOfPlayers - 1; i++) {
      tempCards.push({isSpy: false, location: location.name})
    }
    if (numberOfPlayers > 6) {
      tempCards.pop()
      tempCards.push({isSpy: true, location: 'Попробуй узнать, удачи!'})
      tempCards.push({isSpy: true, location: 'Попробуй узнать, удачи!'})
    } else {
      tempCards.length === 0 ? tempCards.push({
        isSpy: true,
        location: 'Раз ломаешь инпут, играй один и попробуй узнать локацию, бугага!'
      }) : tempCards.push({isSpy: true, location: 'Попробуй узнать, удачи!'})
    }
    for (let j = 0; j < 10; j++) {
      tempCards.sort(() => Math.random() - 0.5);
    }
    setCards(tempCards)
    setIsStarted(true)
  }

  return (<Panel id={props.id}>
    <PanelHeader
      left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
    >
      Назад
    </PanelHeader>
    {!isStarted && <Group>
      <FormItem top="Фамилия">
        <Input type="number" value={numberOfPlayers} onChange={(e) => setNumberOfPlayers(e.target.value)}/>
      </FormItem>
      <Button
        size='s'
        onClick={() => startGame()}
      >
        Раздать карты
      </Button></Group>}
    {isStarted &&
      <>
        {/*<p>Игра началась!<br/>Набор карт:</p>*/}
        {/*{cards.map((card, idx) => {*/}
        {/*  return <p key={`card-${idx}`}>{`${card.isSpy ? 'Шпион' : 'Обыватель'} - ${card.location}`}</p>*/}
        {/*})}*/}
        {tempPlayer < numberOfPlayers && !waitNextPlayer &&
          <Card mode="outline">
            <div style={{height: 200, padding: '15px', backgroundImage: `url(${persik})`}}>
              <p>{`Игрок №${tempPlayer + 1}`}</p>
              <p>{`Ваша роль - ${cards[tempPlayer].isSpy ? 'Шпион' : 'Обыватель'}`}</p>
              <p>{`Локация - ${cards[tempPlayer].location}`}</p>

              <Button
                size='s'
                onClick={() => setWaitNextPlayer(true)}
              >
                {`${tempPlayer===numberOfPlayers-1?'Запустить таймер':'Следующий игрок'}`}
              </Button>
            </div>
          </Card>
        }
        {tempPlayer < numberOfPlayers-1 && waitNextPlayer &&
          <Card mode="outline">
            <div style={{height: 200, padding: '15px', backgroundImage: `url(${persik})`}}>
              <p>{`Передайте телефон следующему игроку`}</p>
              <Button
                size='s'
                onClick={() => {
                  setTempPlayer(tempPlayer + 1)
                  setWaitNextPlayer(false)
                }}
              >
                Показать роль
              </Button>
            </div>
          </Card>
        }
        {tempPlayer >= numberOfPlayers &&
          <p>Ваше время пошло</p>
        }
      </>
    }
  </Panel>)
};

Game.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired
};

export default Game;
