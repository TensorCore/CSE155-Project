import React, { useEffect, createContext, useState } from 'react';
import { database } from './database';

export const DataContext = createContext({});

export const DataContextProvider = (props) => {
  // Initial values are obtained from the props
  const {
    children
  } = props;

  // Use State to store the values
  const [data, setData] = useState([{}]);

  useEffect(() => {
    refreshData()
  }, [] )

  const addNewData = (waterIn, exerciseIn, calorieIn) => {
    database.insertData(waterIn, exerciseIn, calorieIn, refreshData)
  };

  const updateData = (date, infoType, inputNum) => {
    database.updateData(date, infoType, inputNum, refreshData)
  };

  const refreshData = () =>  {
    database.getData(setData)
  }

  const updateSetting = (infoType, inputNum) => {
    database.updateSetting(infoType, inputNum)
  };

  // Make the context object:
  const dataContext = {
    data,
    updateData,
    updateSetting,
  };

  // pass the value in provider and return
  return <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>;
};