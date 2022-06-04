import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, CardGrid, Card} from '@vkontakte/vkui';
import persik from '../img/persik.png';

const Home = ({id, go, fetchedUser, setGameLocations, ...props}) => {
  const [sets] = useState([
    {
      id: 1, name: 'Инфобезное пати', locations: [
        {id: 111, name: 'Хиросима', description: 'Вы очередной выживший счастливчик'},
        {id: 112, name: 'Освенцим', description: 'Плюс в чат, кто решил ИБ за 10 ^_^'},
        {id: 113, name: 'Рио', description: 'Самбреро, мучачосы! Вы на карнавале!'},
      ]
    },
    {
      id: 2, name: 'Летний вайб', locations: [
        {id: 121, name: 'Пляж', description: 'Вы находитесь на Гавайских остравах! Алоха, турбошурик :)'},
        {id: 122, name: 'Озеро', description: 'У бабули в деревне :)'},
        {id: 123, name: 'Лагерь', description: 'Шарите за бесконечное лето?)'},
        {id: 124, name: 'Рио', description: 'Самбреро, мучачосы! Вы на карнавале!'},
        {id: 125, name: 'VKFest', description: 'Уже прикупили билеты?'},
      ]
    },
    {
      id: 3, name: 'Вездекод', locations: [
        {id: 131, name: 'Иркутск', description: 'Самое время посмотреть на восьмое чудо света - Байкал!'},
        {id: 132, name: 'Томск', description: 'Ох уже эти студенты... Они везде...'},
        {id: 133, name: 'Владивосток', description: 'ASAP ДВФУ, респекты'},
        {id: 134, name: 'Ульяновск', description: 'Тут был Ленин???'},
        {id: 135, name: 'Челябинск', description: '- Кто? Челябинск? - Хватит мне звонить!'},
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
  const createSet = () => {
    console.log('Создание кастомки')
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
