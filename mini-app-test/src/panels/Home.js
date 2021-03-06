import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  CardGrid,
  Card,
  ModalRoot,
  ModalPage, FormItem, SplitLayout
} from '@vkontakte/vkui';
import persik from '../img/persik.png';

const Home = ({id, go, fetchedUser, setGameLocations, sets, setSet, setNewSet, ...props}) => {
  const [fullFilled, setFullFiilled] = useState(true)

  const [activeModal, setActiveModal] = React.useState(false);
  const firstInputRef = useRef()

  useEffect(() => {
  })
  const handleClose = () => {
    setFullFiilled(true)
    setActiveModal(null)
  }

  const handleSubmit = () => {
    if (firstInputRef.current.value) {
      const newSet = {
        id: sets[sets.length - 1].id + 1,
        name: firstInputRef.current.value,
        locations: []
      }
      setNewSet(newSet)
      setFullFiilled(true)
      setActiveModal(null)
    } else {
      setFullFiilled(false)
    }
  }

  const modal = (
    <ModalRoot activeModal={activeModal} settlingHeight={"100"}>
      <ModalPage id="modal-2" onClose={handleClose}>
        <Div style={{paddingLeft: "14px 24px"}}>
          {!fullFilled &&
            <p style={{margin: 0, color: "red", fontSize: "0.6rem"}}>Заполните поле!</p>
          }
          <FormItem top="Название" style={{padding: 0}}>
            <input ref={firstInputRef}/>
          </FormItem>
          <Button size='s'
                  onClick={() => handleSubmit()}>Создать
          </Button>
        </Div>
      </ModalPage>
    </ModalRoot>
  )

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
    <div>
      <SplitLayout modal={modal}>
        <Panel id={id}>
          <PanelHeader>Spy Game</PanelHeader>
          <Group>
            <Group
              mode="plain"
              header={<Header mode="secondary">Выберите набор</Header>}
            >
              <CardGrid size="m">
                {sets && sets.map((set) =>
                  <Card mode="outline" key={set.id}>
                    <Div style={{
                      height: 250,
                      backgroundImage: `url(${persik})`,
                      backgroundSize: "cover",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      paddingBottom: "50px"
                    }}>
                      <div>

                        <p>{set.name}</p>
                      </div>
                      <div>
                        <Button
                          style={{marginRight: "5px"}}
                          size='s'
                          onClick={(event) => handleStart(event, set.locations)}
                          data-to='game'
                          locations={set.locations}
                        >
                          Клац
                        </Button>
                        <Button
                          size='s'
                          style={{marginTop: "5px"}}
                          onClick={(event) => handlerEdit(event, set)}
                          data-to='setinfo'
                          mode="secondary"
                        >
                          Редактировать
                        </Button>
                      </div>
                    </Div>
                  </Card>
                )}
                <Card mode="outline">
                  <Div style={{
                    height: 250,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    paddingBottom: "50px"
                  }}>
                    <p>{`Новая категория`}</p>
                    <Button
                      size='s'
                      onClick={() => setActiveModal("modal-2")}
                    >
                      Создать кастомку
                    </Button>
                  </Div>
                </Card>
              </CardGrid>
            </Group>
          </Group>
        </Panel>
      </SplitLayout>
    </div>
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
