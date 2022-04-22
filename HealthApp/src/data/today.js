import React, {useState} from "react";

export default function getToday(){
    const [today, setToday]  = useState('');
    const formatYmd = (date) => date.toISOString().slice(0, 10);
    setToday(formatYmd(new Date()));
    console.log(`Today for DB is: ${today}`);    
    return today;
};