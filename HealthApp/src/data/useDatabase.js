import React, {useEffect} from 'react';

import { database } from './database';

export default function useDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        //comment out DROPDB when LIVE
        await database.dropDatabaseTablesAsync()
        await database.setupDatabaseAsync()
        await database.setupDataAsync()

        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  return isDBLoadingComplete;
}