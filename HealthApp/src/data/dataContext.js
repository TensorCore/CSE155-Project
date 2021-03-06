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
  const [totalAvgCalorie, setAvgCalorie] = useState([{}]);
  const [totalAvgWater, setAvgWater] = useState([{}]);
  const [totalAvgExercise, setAvgExercise] = useState([{}]);
  const [setting, setSetting] = useState([{}]);

  useEffect(() => {
    refreshData()
  }, [] )

  // const addNewData = (waterIn, exerciseIn, calorieIn) => {
  //   database.insertData(waterIn, exerciseIn, calorieIn, refreshData)
  // };

  const updateData = (date, infoType, inputNum) => {
    database.updateData(date, infoType, inputNum, refreshData)
  };

  const updateSetting = (infoType, inputNum) => {
    database.updateSetting(infoType, inputNum, refreshData)
  };

  const refreshData = () =>  {
    database.getAvgCalorie(setAvgCalorie);
    database.getAvgWater(setAvgWater);
    database.getAvgExercise(setAvgExercise);
    database.getSetting(setSetting);
    database.getData(setData);
  }

  // Make the context object:
  const dataContext = {
    data,
    updateData,
    updateSetting,
    totalAvgExercise,
    totalAvgWater,
    totalAvgCalorie,
    setting,
  };

  // pass the value in provider and return
  return <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>;
};