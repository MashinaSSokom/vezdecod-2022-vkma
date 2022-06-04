import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, CardGrid, Card} from '@vkontakte/vkui';
import persik from '../img/persik.png';

const Home = ({id, go, fetchedUser, setGameLocations, ...props}) => {
  const [sets] = useState([
    {
      id: 1, name: 'Ибб на рукаве', locations: [
        {id: 123, name: 'Пляж', descriptions: 'Вы находитесь на Гавайских остравах! Алоха, турбошурик :)'},
        {id: 124, name: 'Освенцим', descriptions: 'Плюс в чат, кто решил ИБ за 10 ^_^'},
        {id: 125, name: 'Рио', descriptions: 'Самбреро, мучачосы! Вы на карнавале!'},
      ]
    }

  ])
  useEffect(async () => {
    console.log('kek')
  }, [])
  const handler = (e, locations) => {
    setGameLocations(locations)
    go(e)
  }
  return (
    <Panel id={id}>
      <PanelHeader>Spy Game</PanelHeader>
      {/*{fetchedUser &&*/}
      {/*  <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>*/}
      {/*    <Cell*/}
      {/*      before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}*/}
      {/*      description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}*/}
      {/*    >*/}
      {/*      {`${fetchedUser.first_name} ${fetchedUser.last_name}`}*/}
      {/*    </Cell>*/}
      {/*  </Group>}*/}
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
                    onClick={(event) => handler(event, set.locations)}
                    data-to='game'
                    locations={set.locations}

                  >
                    Клац
                  </Button>
                </div>
              </Card>
            )}

          </CardGrid>
        </Group>
      </Group>
      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={go} data-to="persik">
            Show me the Persik, please
          </Button>
        </Div>
      </Group>
    </Panel>
  )
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  setGameLocations: PropTypes.func.isRequired,
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
