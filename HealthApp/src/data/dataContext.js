import React, { useEffect, createContext, useState } from 'react';
import { database } from './database';

export const DataContext = createContext({});

export const DataContextProvider = props => {
  // Initial values are obtained from the props
  const {
    data: initialData,
    children
  } = props;

  // Use State to store the values
  const [data, setData] = useState(initialData);

  useEffect(() => {
    refreshData()
  }, [] )

  const addNewData = (waterIn, exerciseIn, calorieIn) => {
    return database.insertData(waterIn, exerciseIn, calorieIn, refreshData)
  };

  const refreshData = () =>  {
    return database.getData(setData)
  }

  // Make the context object:
  const dataContext = {
    data,
    addNewData
  };

  // pass the value in provider and return
  return <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>;
};