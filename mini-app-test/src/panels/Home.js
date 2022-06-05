import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, CardGrid, Card} from '@vkontakte/vkui';
import persik from '../img/persik.png';

const Home = ({id, go, fetchedUser, setGameLocations, sets, setSet, ...props}) => {
  useEffect(() => {
    const customSets = localStorage.getItem('customSets')
    if (customSets) {
      console.log(customSets)
      // setSets([...sets, ...customSets])
    } else {
      console.log()
      localStorage.setItem('customSets', '')
    }
  }, [])

  const handleStart = (e, locations) => {
    setGameLocations(locations)
    go(e)
  }
  const handlerEdit = (e, set) => {
    setSet(set)
    go(e)
  }
  const createSet = () => {
    console.log('Создание кастомки')
  }
  return (
    <Panel id={id}>
      <PanelHeader>Spy Game</PanelHeader>
      <Group>
        <Group
          mode="plain"
          header={<Header mode="secondary">Выберите набор</Header>}
        >
          <CardGrid size="m">
            {sets.map((set) =>
              <Card mode="outline" key={set.id}>
                <div style={{height: 200, padding: '15px', backgroundImage: `url(${persik})`}}>
                  <p>{set.name}</p>
                  <Button
                    size='s'
                    onClick={(event) => handleStart(event, set.locations)}
                    data-to='game'
                    locations={set.locations}
                  >
                    Клац
                  </Button>
                  <Button
                    size='s'
                    onClick={(event) => handlerEdit(event, set)}
                    data-to='setinfo'
                    mode="secondary"
                    style={{marginLeft: '5px'}}
                  >
                    Редактировать набор
                  </Button>
                </div>
              </Card>
            )}
            <Card mode="outline">
              <div style={{height: 200, padding: '15px'}}>
                <p>{`Новая категория`}</p>
                <Button
                  size='s'
                  onClick={createSet}
                >
                  Создать кастомку
                </Button>
              </div>
            </Card>
          </CardGrid>
        </Group>
      </Group>
    </Panel>
  )
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  setGameLocations: PropTypes.func.isRequired,
  setSet: PropTypes.func.isRequired,
  newLocation: PropTypes.object.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default Home;
