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

const insertData = (Date, waterIn, exerciseIn, calorieIn, successFunc) => {
      insert("data", {timestamp: Date, water:waterIn, exercise:exerciseIn, calorie:calorieIn})
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
}

const updateData = (data, info) =>{
  let Date = getToday();
  switch (data) {
    case "water":
      update('data', {water: info}, {timestamp: Date})
      .then(() => {console.log("Updated Water")})
      .catch((err) => console.log(err));
    break;
    case "exercise":
      update('data', {exercise: info}, {timestamp: Date})
      .then(() => {console.log("Updated Exercise")})
      .catch((err) => console.log(err));
    break;      
    case "calorie":
      update('calorie', {water: info}, {timestamp: Date})
      .then(() => {console.log("Updated calorie")})
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
}