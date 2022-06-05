import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import Game from "./panels/Game";
import SetInfo from "./panels/SetInfo";

const App = () => {
  const [scheme, setScheme] = useState('bright_light')
  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
  const [gameLocations, setGameLocations] = useState([]);
  const [getSet, setSet] = useState({})
  const [newLocation, setNewLocation] = useState({})
  const [sets, setSets] = useState([
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

  useEffect(() => {
    bridge.subscribe(({detail: {type, data}}) => {
      if (type === 'VKWebAppUpdateConfig') {
        setScheme(data.scheme)
      }
    });
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const oldSets = JSON.parse(JSON.stringify(sets))
    // console.log(oldSets)
    // console.log(newLocation)
    let newSets = oldSets.map(set => {
      if (set.id === newLocation.setId) {
        set.locations.push(newLocation.location)
      }
      return set
    })
    setSets(newSets)
  }, [newLocation])
  const go = e => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <ConfigProvider scheme={scheme}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home id='home' fetchedUser={fetchedUser} go={go} setGameLocations={setGameLocations} sets={sets} setSet={setSet} newLocation={newLocation} />
                <Persik id='persik' go={go}/>
                <Game id='game' go={go} locations={gameLocations}/>
                <SetInfo id={'setinfo'} go={go} getSet={getSet} setNewLocation={setNewLocation}/>
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;
