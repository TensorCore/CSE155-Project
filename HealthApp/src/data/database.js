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

const insertData = (waterIn, exerciseIn, calorieIn, successFunc) => {
      insert("data", [{water:waterIn, exercise:exerciseIn, calorie:calorieIn}])
      .then(()=>{
        successFunc();
        console.log('Inserted Data');
      })
      .catch((err)=>{console.log(err)});
}


const setupDatabaseAsync = () => {
    createTable("data", {id: "INTEGER PRIMARY KEY AUTOINCREMENT", timestamp: "DATE DEFAULT (date('now', 'localtime')) UNIQUE" , water:"INT", exercise:"INT", calorie:"INT"})
    .then(()=>{console.log('Created Data Table')})
    .catch((err)=>console.log(err));
    createTable("setting", {id: "INTEGER PRIMARY KEY UNIQUE", ExerciseGoal: "INTEGER", FoodGoal: "INTEGER", WaterGoal: "INTEGER"})
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
      executeSql(`INSERT or REPLACE INTO setting (WaterGoal) VALUES (${dataIn})`)
      .then(() => {console.log(`Updated WaterGoal ${dataIn}`); successFunc();})
      .catch((err) => console.log(err));
    break;
    case "exercise":
      executeSql(`INSERT or REPLACE INTO setting (ExerciseGoal) VALUES (${dataIn})`)
      .then(() => {console.log(`Updated ExerciseGoal ${dataIn}`); successFunc();})
      .catch((err) => console.log(err));
    break;      
    case "calorie":
      executeSql(`INSERT or REPLACE INTO setting (CalorieGoal) VALUES (${dataIn})`)
      .then(() => {console.log(`Updated CalorieGoal ${dataIn}`); successFunc();})
      .catch((err) => console.log(err));
    break;    
  }
}

const deleteInfo = (Date) =>{
  console.log("Deleting Information");
  deleteData("data", {date: Date})
  .then(()=>{console.log('Deleted Data')})
  .catch((err) => {console.log(err)});
}

const dropDatabaseTablesAsync = async () => {
  dropTable('data')
  .then(()=>{console.log('Dropped Data Table')})
  .catch((err)=>{console.log(err)});
}

const setupDataAsync = () => {
  insert('data', historicalData)
  .then(()=>{
    console.log('Inserted TestSetupData')
  })
  .catch((err)=>{console.log(err)});
}

export const database = {
    getData,
    insertData,
    setupDatabaseAsync,
    updateData,
    deleteInfo,
    dropDatabaseTablesAsync,
    setupDataAsync,
    updateSetting,
}