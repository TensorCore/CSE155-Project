import React, {useEffect} from 'react';

import { database } from './database';

export default function useDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        //comment out DROPDB when LIVE
        database.dropDatabaseTablesAsync()
        database.setupDatabaseAsync()
        database.setupDataAsync()
        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  return isDBLoadingComplete;
}