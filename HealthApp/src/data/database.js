import React from 'react';
import * as SQLite from 'expo-sqlite';

const db = openDatabase('db.db');

const getData = (setDataFunc) => {
    db.transaction(
        tx => {
            tx.executeSql(
            'select * from data',
            [],
            (_, { rows: { _array } }) => {
                setDataFunc(_array)
        }
      );
    },
     (t, error) => { console.log("db error load data"); console.log(error) },
     (_t, _success) => { console.log("loaded data")}
    );
}

const insertData = (water, exercise, calorie, successFunc) => {
    db.transaction( tx => {
        tx.executeSql( "insert into data (water, exercise, calorie) values (?, ?, ?)", [water, exercise, calorie]);
      },
      (t, error) => { console.log("db error insertData"); console.log(error);},
      (t, success) => { successFunc() }
    )
}


const dropDatabaseTablesAsync = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'drop table data',
          [],
          (_, result) => { resolve(result) },
          (_, error) => { console.log("error dropping data table"); reject(error)
          }
        )
      })
    })
  }

  const setupDatabaseAsync = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
          tx.executeSql(
            'create table if not exists data (id integer primary key not null, Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, water integer, exercise integer, calories integer);'
          );
        },
        (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
        (_, success) => { resolve(success)}
      )
    })
  }

  const setupDataAsync = async () => {
    return new Promise((resolve, _reject) => {
      db.transaction( tx => {
          tx.executeSql( "insert into data (water, exercise, calorie) values (?, ?, ?, ?)", [2, 30, 1000] );
        },
        (t, error) => { console.log("db error insertData"); console.log(error); resolve() },
        (t, success) => { resolve(success)}
      )
    })
  }

  export const database = {
      getData,
      insertData,
      setupDatabaseAsync,
      dropDatabaseTablesAsync,
      setupDataAsync,
  }