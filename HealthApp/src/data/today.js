import React, {useState, useEffect} from "react";

export default function getToday(){
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var today = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1).slice(0, 10);
    return today;
};