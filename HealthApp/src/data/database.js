import React, { useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite';
import Database, { createTable, deleteData, executeSql, insert, update, search, dropTable } from "expo-sqlite-query-helper";

Database('appData.db');

const getData = (setDataFunc) => {
  executeSql("SELECT * FROM data")
  .then((obj) => {
    console.log(obj.rows._array);
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
    createTable("data", {id: "INTEGER PRIMARY KEY AUTOINCREMENT", timestamp: "DATE DEFAULT (date('now', 'localtime'))" , water:"INT", exercise:"INT", calorie:"INT"})
    .then(()=>{console.log('Created Data Table')})
    .catch((err)=>console.log(err));
}

const updateData = async (Date, data, info) =>{
  switch (data) {
    case "water":
      console.log("Updated Water");
      db.transaction(tx => {
        tx.executeSql('UPDATE data SET water = ? WHERE timestamp = ?', [info,Date]);
      })
      break;
    case "exercise":
      db.transaction(tx => {
        tx.executeSql('UPDATE data SET exercise = ? WHERE timestamp = ?', [info,Date]);
      })
      break;      
    case "calorie":
      db.transaction(tx => {
        tx.executeSql('UPDATE data SET calorie = ? WHERE timestamp = ?', [info,Date]);
      })
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
  insert('data', [{water: 5, exercise: 1000, calorie: 200}, {water: 20, exercise: 300, calorie: 1000}])
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