import React, {useState, useEffect} from "react";

export default function getToday(){
    const formatYmd = (date) => date.toISOString().slice(0, 10);
    let today = formatYmd(new Date());
    return today;
};