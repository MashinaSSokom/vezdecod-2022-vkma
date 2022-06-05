import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardGrid, Div,
  FormItem,
  Group,
  Header,
  Input, ModalPage, ModalPageHeader, ModalRoot,
  Panel,
  PanelHeader,
  PanelHeaderBack, SplitLayout
} from '@vkontakte/vkui';
import persik from "../img/persik.png";

const SetInfo = (props) => {
  const [locations, setLocations] = useState([])
  const [fullFilled, setFullFiilled] = useState(true)
  const [activeModal, setActiveModal] = React.useState(false);
  const firstInputRef = useRef()
  const secondInputRef = useRef()


  useEffect(async () => {
    setLocations(JSON.parse(JSON.stringify(props.getSet.locations)))
  }, [])


  const handleClose = () => {
    setFullFiilled(true)

    setActiveModal(null)
  }
  const handleSubmit = () => {
    if (firstInputRef.current.value && secondInputRef.current.value) {
      const newLocation = {
        setId: props.getSet.id,
        location: {
          id: locations[locations.length - 1].id + 1,
          name: firstInputRef.current.value,
          description: secondInputRef.current.value
        }
      }
      setLocations([...locations,
        {
          id: locations[locations.length - 1].id + 1,
          name: firstInputRef.current.value,
          description: secondInputRef.current.value
        }])
      // console.log(newLocation)
      props.setNewLocation(newLocation)
      setFullFiilled(true)
      setActiveModal(null)
    } else {
      setFullFiilled(false)
    }
  }

  const modal = (
    <ModalRoot activeModal={activeModal} settlingHeight={"100"}>
      <ModalPage id="modal-1" onClose={handleClose}>
        <Div style={{paddingLeft: "14px 24px"}}>
          {!fullFilled &&
            <p style={{margin: 0, color: "red", fontSize: "0.6rem"}}>Заполните все поля!</p>
          }
          <FormItem top="Локация" style={{padding: 0}}>
            <input ref={firstInputRef}/>
          </FormItem>
          <FormItem top="Описание" style={{padding: 0, marginBottom: "10px"}}>
            <input type={"text"} ref={secondInputRef} style={{width: "350px"}}/>
          </FormItem>
          <Button size='s'
                  onClick={() => handleSubmit()}>Создать
          </Button>
        </Div>
      </ModalPage>
    </ModalRoot>
  )

  return (
    <div>
      <SplitLayout modal={modal}>
        <Panel id={props.id}>
          <PanelHeader
            left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
          >
            {`Редактировать набор: "${props.getSet.name}"`}
          </PanelHeader>
          <Group
            mode="plain"
            header={<Header mode="secondary">Локации в наборе</Header>}
          >
            <CardGrid size="m">
              <Card mode="outline">
                <div style={{height: 150, padding: '15px'}}>
                  <p>{`Неизвестное место...`}</p>
                  <Button
                    size='s'
                    onClick={() => setActiveModal("modal-1")}
                  >
                    Добавить локацию
                  </Button>
                </div>

              </Card>
              {locations.map((location) =>
                <Card mode="outline" key={location.id}>
                  <div style={{height: 150, padding: '15px'}}>
                    <p>{`Локация - ${location.name}`}</p>
                    <p>{`Описание - ${location.description}`}</p>
                    {/*<Button*/}
                    {/*  size='s'*/}
                    {/*  // onClick={(event) => handleStart(event, set.locations)}*/}
                    {/*  data-to='game'*/}
                    {/*  locations={set.locations}*/}
                    {/*>*/}
                    {/*  Клац*/}
                    {/*</Button>*/}
                    {/*<Button*/}
                    {/*  size='s'*/}
                    {/*  // onClick={(event) => handlerEdit(event, set)}*/}
                    {/*  data-to='setinfo'*/}
                    {/*  mode="secondary"*/}
                    {/*  style={{marginLeft: '5px'}}*/}
                    {/*>*/}
                    {/*  Редактировать набор*/}
                    {/*</Button>*/}
                  </div>
                </Card>
              )}
            </CardGrid>
          </Group>
        </Panel>
      </SplitLayout>
    </div>
  );
};

export default SetInfo;

SetInfo.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};
