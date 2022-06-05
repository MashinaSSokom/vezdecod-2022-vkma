import React, {createRef, useEffect, useRef, useState} from 'react';
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
  const [playerNames, setPlayerNames] = useState({
    0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '', 10: '', 11: ''
  })
  const [playersUpdated, setPlayersUpdated] = useState(false)

  const playersRef = useRef(null)
  // useEffect(() => {
  //   // console.log(playerNames)
  // }, [playersUpdated])
  useEffect(async () => {
    let randomLoc = locations[Math.floor(Math.random() * locations.length)]
    setLocation(randomLoc)
  }, [location])
  // useEffect(async () => {
  //   console.log(waitNextPlayer)
  // }, [waitNextPlayer])
  // useEffect(async () => {
  //   console.log(tempPlayer, numberOfPlayers)
  // }, [tempPlayer])

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
      setNumberOfPlayers(1)
      tempCards.length === 0 ? tempCards.push({
        isSpy: true, location: 'Раз ломаешь инпут, играй один и попробуй узнать локацию, бугага!'
      }) : tempCards.push({isSpy: true, location: 'Попробуй узнать, удачи!', description: null})
    }
    for (let j = 0; j < 10; j++) {
      tempCards.sort(() => Math.random() - 0.5);
    }
    for (let i = 0; i<tempCards.length; i++) {
      tempCards[i].playerName = playerNames[i]
    }
    setCards(tempCards)
    // console.log(playersRef)
    setIsStarted(true)
  }
  const getNameInputs = count => {
    let content = [];
    for (let i = 0; i < count; i++) {
      content.push(
        <FormItem top={`Игрок №${i + 1}`} style={{padding: '0'}}
                  key={`player-${i}`}
        >
          <Input type="text"
                 style={{width: '50%'}}
                 value={playerNames[i]}
                 onChange={(e) => {
                   setPlayersUpdated(!playersUpdated)
                   const oldNames = JSON.parse(JSON.stringify(playerNames))
                   oldNames[i] = e.target.value
                   setPlayerNames(oldNames)
                 }}
          />
        </FormItem>
      );
    }
    return content;
  };

  return (<Panel id={props.id}>
    <PanelHeader
      left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
    >
      Назад
    </PanelHeader>
    {!isStarted && <Group style={{padding: '15px'}}>
      <FormItem top="Количество игроков (максимум 12)" style={{padding: '0'}}>
        <Input type="number" value={numberOfPlayers}
               max={12}
               min={1}
               onChange={(e) => {
                 setNumberOfPlayers(e.target.value <= 12 ? e.target.value : numberOfPlayers)
                 const oldNames = JSON.parse(JSON.stringify(playerNames))
                 setPlayerNames(oldNames)
               }}/>
      </FormItem>
      {numberOfPlayers > 0 &&
        <div ref={playersRef}>
          {getNameInputs(numberOfPlayers)}
        </div>
      }
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
        <Div style={{
          height: 200, padding: '15px',
          // backgroundImage: `url(${persik})`
        }}>
          <p>{`${cards[tempPlayer].playerName?cards[tempPlayer].playerName:'Игрок №'+(tempPlayer+1)}`}</p>
          <p>{`Ваша роль - ${cards[tempPlayer].isSpy ? 'Шпион' : 'Обыватель'}`}</p>
          <p>{`Локация - ${cards[tempPlayer].location}`}</p>
          <p>{`Описание - ${cards[tempPlayer].description ? cards[tempPlayer].description : 'Засекречено!'}`}</p>

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
        <Div style={{
          height: 200, padding: '15px',
          // backgroundImage: `url(${persik})`
        }}>
          <p>{`Передайте телефон ${cards[tempPlayer].playerName?cards[tempPlayer].playerName:'Игрок №'+(tempPlayer+1)}`}</p>
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
