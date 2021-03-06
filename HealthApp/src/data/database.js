import React, { useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite';
import Database, { createTable, deleteData, executeSql, insert, update, search, dropTable } from "expo-sqlite-query-helper";
import historicalData from "./historicalData";
import getToday from "./today";

Database('appData.db');

const getData = (setDataFunc) => {
  executeSql("SELECT * FROM data")
  .then((obj) => {
    setDataFunc(obj.rows._array);
  })
  .catch((err)=>{console.log(err)});
}

const getAvgExercise = (setDataFunc) => {
  executeSql("SELECT AVG(exercise) as avg FROM data")
  .then((obj) => {
    setDataFunc(obj.rows._array);
  })
  .catch((err)=>{console.log(err)});
}

const getAvgCalorie = (setDataFunc) => {
  executeSql("SELECT AVG(calorie) as avg FROM data")
  .then((obj) => {
    setDataFunc(obj.rows._array);
  })
  .catch((err)=>{console.log(err)});
}

const getAvgWater = (setDataFunc) => {
  executeSql("SELECT AVG(water) as avg FROM data")
  .then((obj) => {
    setDataFunc(obj.rows._array);
  })
  .catch((err)=>{console.log(err)});
}

const getSetting = (setDataFunc) => {
  executeSql("SELECT * FROM setting")
  .then((obj) => {
    setDataFunc(obj.rows._array);
  })
  .catch((err)=>{console.log(err)});
}
// const insertData = (waterIn, exerciseIn, calorieIn, successFunc) => {
//       insert("data", [{water:waterIn, exercise:exerciseIn, calorie:calorieIn}])
//       .then(()=>{
//         successFunc();
//         console.log('Inserted Data');
//       })
//       .catch((err)=>{console.log(err)});
// }


const setupDatabaseAsync = () => {
    createTable("data", {id: "INTEGER PRIMARY KEY AUTOINCREMENT", timestamp: "DATE DEFAULT (date('now', 'localtime')) UNIQUE" , water:"INT", exercise:"INT", calorie:"INT"})
    .then(()=>{console.log('Created Data Table')})
    .catch((err)=>console.log(err));
    createTable("setting", {id: "INTEGER PRIMARY KEY", exerciseGoal: "INTEGER", calorieGoal: "INTEGER", waterGoal: "INTEGER"})
    .then(()=>{console.log('Created Setting Table')})
    .catch((err)=>console.log(err));
}

const updateData = (Date, infoType, dataIn, successFunc) =>{
  switch (infoType) {
    case "water":
      executeSql(`INSERT or REPLACE INTO data (id, timestamp, water, exercise, calorie) values ((SELECT ID from DATA WHERE timestamp="${Date}"), "${Date}", ${dataIn}, 
                (SELECT exercise from DATA WHERE timestamp="${Date}"), (SELECT calorie from DATA WHERE timestamp="${Date}"))`)
      .then(() => {console.log(`Updated Water ${Date}`); successFunc();})
      .catch((err) => console.log(err));
    break;
    case "exercise":
      executeSql(`INSERT or REPLACE INTO data (id, timestamp, exercise, water, calorie) values ((SELECT ID from DATA WHERE timestamp="${Date}"), "${Date}", ${dataIn}, 
                (SELECT water from DATA WHERE timestamp="${Date}"), (SELECT calorie from DATA WHERE timestamp="${Date}"))`)
      .then(() => {console.log(`Updated Exercise ${Date}`); successFunc();})
      .catch((err) => console.log(err));
    break;      
    case "calorie":
      executeSql(`INSERT or REPLACE INTO data (id, timestamp, calorie, water, exercise) values ((SELECT ID from DATA WHERE timestamp="${Date}"), "${Date}", ${dataIn}, 
                (SELECT water from DATA WHERE timestamp="${Date}"), (SELECT exercise from DATA WHERE timestamp="${Date}"))`)
      .then(() => {console.log(`Updated Calories ${Date}`); successFunc();})
      .catch((err) => console.log(err));
    break;      
  }
}

const updateSetting = (infoType, dataIn, successFunc) =>{
  switch (infoType) {
    case "water":
      executeSql(`INSERT or REPLACE INTO setting (id, waterGoal, exerciseGoal, calorieGoal) VALUES (1, ${dataIn}, (Select exerciseGoal FROM setting WHERE ID=1), (Select calorieGoal FROM setting WHERE ID=1))`)
      .then(() => {console.log(`Updated waterGoal ${dataIn}`); successFunc();})
      .catch((err) => console.log(err));
    break;
    case "exercise":
      executeSql(`INSERT or REPLACE INTO setting (id, exerciseGoal, calorieGoal, waterGoal) VALUES (1, ${dataIn}, (Select calorieGoal FROM setting WHERE ID=1), (Select waterGoal FROM setting WHERE ID=1))`)
      .then(() => {console.log(`Updated exerciseGoal ${dataIn}`); successFunc();})
      .catch((err) => console.log(err));
    break;      
    case "calorie":
      executeSql(`INSERT or REPLACE INTO setting (id, calorieGoal, exerciseGoal, waterGoal) VALUES (1, ${dataIn}, (Select exerciseGoal FROM setting WHERE ID=1), (Select waterGoal FROM setting WHERE ID=1))`)
      .then(() => {console.log(`Updated calorieGoal ${dataIn}`); successFunc();})
      .catch((err) => console.log(err));
    break;    
  }
}

const deleteInfo = (Date) =>{
  console.log("Deleting Information");
  deleteData("data", {timestamp: Date})
  .then(()=>{console.log('Deleted Data')})
  .catch((err) => {console.log(err)});
}

const dropDatabaseTablesAsync = async () => {
  dropTable('data')
  .then(()=>{console.log('Dropped Data Table')})
  .catch((err)=>{console.log(err)});

  dropTable('setting')
  .then(()=>{console.log('Dropped Data Table')})
  .catch((err)=>{console.log(err)});
}

const setupDataAsync = () => {
  insert('data', historicalData)
  .then(()=>{
    console.log('Inserted Historical Data')
  })
  .catch((err)=>{console.log(err)});

  insert('setting', [{id: 1, exerciseGoal: 425, waterGoal: 8, calorieGoal: 2250}])
  .then(()=>{
    console.log('Inserted SettingData')
  })
  .catch((err)=>{console.log(err)});
}

export const database = {
    getData,
    setupDatabaseAsync,
    updateData,
    deleteInfo,
    dropDatabaseTablesAsync,
    setupDataAsync,
    updateSetting,
    getAvgExercise,
    getAvgCalorie,
    getAvgWater,
    getSetting,
}