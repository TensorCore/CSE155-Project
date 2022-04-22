import React, { useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite';
import Database, { createTable, deleteData, executeSql, insert, update, search } from "expo-sqlite-query-helper";

Database('db2.db');
const db = SQLite.openDatabase('db2.db');

const getData = async (setDataFunc) => {
  //insertData("2022-01-02", 1, 2, 3);
  const result = await executeSql("SELECT * FROM data");
  console.log({result});
  updateData("2022-01-01", "water", 3);
}

const insertData = async (Date, waterIn, exerciseIn, calorieIn, successFunc) => {
  console.log("Begin Insertion");
      const inserted = await insert("data", [{timestamp: Date, water:waterIn, exercise:exerciseIn, calorie:calorieIn}]);
      console.log({inserted});
}

<<<<<<< HEAD
const setupDatabaseAsync = async () => {
    console.log("Database setup called");
    const created = await createTable("data", {timestamp: "DATETIME UNIQUE" , water:"INT", exercise:"INT", calorie:"INT"});
    console.log({created});
}

const updateData = async (Date, data, info) =>{
  switch (data) {
    case "water":
      console.log("Updated Water");
=======
const dropDatabaseTablesAsync = async () => {
    return new Promise((resolve, reject) => {
>>>>>>> 34f76c209fc48614092b89e27c3d71f286e4df0e
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

const deleteInfo = async (Date)=>{
  console.log("Deleting Information");
  const deleted = await deleteData("data", {date: Date} );
}

  export const database = {
      getData,
      insertData,
      setupDatabaseAsync,
      updateData,
      deleteInfo
  }