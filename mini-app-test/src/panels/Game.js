import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {Button, Card, Div, FormItem, Group, Input, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';

import persik from '../img/persik.png';
import './Persik.css';
import Timer from "../components/Timer";

const Game = ({locations, ...props}) => {

  const [location, setLocation] = useState({})
  const [isStarted, setIsStarted] = useState(false)
  const [numberOfPlayers, setNumberOfPlayers] = useState(2)
  const [cards, setCards] = useState([])
  const [tempPlayer, setTempPlayer] = useState(0)
  const [waitNextPlayer, setWaitNextPlayer] = useState(false)
  const [totalTime, setTotalTime] = useState(null)

  useEffect(async () => {
    let randomLoc = locations[Math.floor(Math.random() * locations.length)]
    console.log(randomLoc)
    setLocation(randomLoc)
  }, [location])
  useEffect(async () => {
    console.log(waitNextPlayer)
  }, [waitNextPlayer])
  useEffect(async () => {
    console.log(tempPlayer, numberOfPlayers)
  }, [tempPlayer])
  const startGame = () => {
    let tempCards = []
    for (let i = 0; i < numberOfPlayers - 1; i++) {
      tempCards.push({isSpy: false, location: location.name, description: location.description})
    }
    if (numberOfPlayers > 6) {
      tempCards.pop()
      tempCards.push({isSpy: true, location: 'Попробуй узнать, удачи!', description: null})
      tempCards.push({isSpy: true, location: 'Попробуй узнать, удачи!', description: null})
    } else {
      tempCards.length === 0 ? tempCards.push({
        isSpy: true, location: 'Раз ломаешь инпут, играй один и попробуй узнать локацию, бугага!'
      }) : tempCards.push({isSpy: true, location: 'Попробуй узнать, удачи!', description: null})
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
    {!isStarted && <Group style={{padding: '15px'}}>
      <FormItem top="Фамилия" style={{padding: '0'}}>
        <Input type="number" value={numberOfPlayers} onChange={(e) => setNumberOfPlayers(e.target.value)}/>
      </FormItem>
      <Button style={{marginTop: '15px'}}
              size='l'
              onClick={() => {
                startGame()
              }}
      >
        Раздать карты
      </Button></Group>}
    {isStarted && <Group style={{padding: '15px'}}>
      {/*<p>Игра началась!<br/>Набор карт:</p>*/}
      {/*{cards.map((card, idx) => {*/}
      {/*  return <p key={`card-${idx}`}>{`${card.isSpy ? 'Шпион' : 'Обыватель'} - ${card.location}`}</p>*/}
      {/*})}*/}
      {tempPlayer < numberOfPlayers && !waitNextPlayer && <Card mode="outline">
        <Div style={{height: 200, padding: '15px',
          // backgroundImage: `url(${persik})`
        }}>
          <p>{`Игрок №${tempPlayer + 1}`}</p>
          <p>{`Ваша роль - ${cards[tempPlayer].isSpy ? 'Шпион' : 'Обыватель'}`}</p>
          <p>{`Локация - ${cards[tempPlayer].location}`}</p>
          <p>{`Описание - ${cards[tempPlayer].description?cards[tempPlayer].description:'Засекречено!'}`}</p>

          <Button
            size='s'
            onClick={() => {
              setTempPlayer(tempPlayer + 1)
              setWaitNextPlayer(true)
            }}
          >
            {`${tempPlayer === numberOfPlayers - 1 ? 'Запустить таймер' : 'Следующий игрок'}`}
          </Button>
        </Div>
      </Card>}
      {tempPlayer < numberOfPlayers && waitNextPlayer && <Card mode="outline">
        <Div style={{height: 200, padding: '15px',
          // backgroundImage: `url(${persik})`
        }}>
          <p>{`Передайте телефон следующему игроку`}</p>
          <Button
            size='s'
            onClick={() => {
              setWaitNextPlayer(false)
            }}
          >
            Показать роль
          </Button>
        </Div>
      </Card>}
      {tempPlayer >= numberOfPlayers && isStarted &&
        <Div>
          <Timer totalTime={numberOfPlayers * 60}/>
        </Div>}
    </Group>}
  </Panel>)
};

Game.propTypes = {
  id: PropTypes.string.isRequired, go: PropTypes.func.isRequired, locations: PropTypes.array.isRequired
};

export default Game;
