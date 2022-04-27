export default function gatherDateData(label, selectedDate , data) {
    data.map(res=>{
        if(res.timestamp === selectedDate){
            if(label.toLowerCase() === 'exercise'){
                return res.exercise;
            } else if(label.toLowerCase() === 'water') {
                return res.water
            } else if(label.toLowerCase() === 'calorie') {
                return res.calorie
            }
        }
    })
}