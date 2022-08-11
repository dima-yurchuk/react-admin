import React, {useEffect, useMemo, useState} from "react";
import { Admin, Resource, DataProvider } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import {UserList, UserEdit, UserCreate} from "./components/CustomUserList";
import io from "socket.io-client";
import {getRange} from "./utils";
const socket = io('ws://localhost:5000');

function App() {
  // const dp = dataProvider()
  const [dataProvider, setDataProvider] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isReadyDataProvider, setIsReadyDataProvider] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(false);

  useEffect( ()=>{
      // console.log('isReadyDataProvider')
      const socketPromise =
          new Promise((resolve, reject)=> {
              socket.on('message', function(data) {
                  setIsReadyDataProvider(false)
                  setUserData(data)
                  // console.log('data from socket ->', data);
                  resolve(data)
              });
          })
       socketPromise.then((data)=>{
          setIsReadyDataProvider(true)
          setIsFirstLoading(true)
      })
  },[])
    useEffect(()=>{
        // console.log(userData)
        const baseDataProvider = simpleRestProvider('http://localhost:5000/api');
        const dataProviderObj = {
            ...baseDataProvider,
            getList: async (resource, params) => {
                // console.log('get list')
                const parameters = new URLSearchParams(window.location.search);
                let range = getRange(parameters, userData)
                return {
                    data: userData.slice(range['start'], range['end']),
                    total: userData.length
                };
            }
        }
        setDataProvider(dataProviderObj)
        isFirstLoading && setIsReadyDataProvider(true)
    },[isReadyDataProvider])


  return (
      <div className="App">
          {isReadyDataProvider ?
          <Admin dataProvider={dataProvider}>
              <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate}/>
          </Admin> : <div>дані завантажуються</div>}
      </div>
  );
}

export default App;
