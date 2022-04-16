import React from 'react';
import * as SQLite from 'expo-sqlite';

const db = openDatabase();

const getSetting = (setSettingFunc) => {
    db.transaction(
        tx => {
            tx.executeSql(
            'select * from setting',
            [],
            (_, { rows: { _array } }) => {
                setSettingFunc(_array)
        }
      );
    },
     (t, error) => { console.log("db error load settings"); console.log(error) },
     (_t, _success) => { console.log("loaded settings")}
    );
} 