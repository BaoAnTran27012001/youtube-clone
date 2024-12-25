import moment from "moment"
const ranges = [{
  divider: 1E3,
  suffix: 'K'
}, {
  divider: 1E6,
  suffix: 'M'
}, {
  divider: 1E9,
  suffix: 'B'
}];
export const convertVideoDuration = (str:string)=>{
  const milliSeconds = moment.duration(str).asMilliseconds();
  return moment.utc(milliSeconds).format('mm:ss');
  // const minutes = Math.floor(milliSeconds / 60000);
  // const seconds:number = ((milliSeconds % 60000) / 1000).toFixed(0);
  // const hours = (milliSeconds / (1000 * 60 * 60));
  // return hours >= 1 ? hours.toFixed(0) + ":" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds: minutes + ":" + (seconds < 10 ? '0' : '') + seconds;// (1000 * 60)) % 60

}
// function for formatt views
export const formatNumber = (input:string)=> {
  const convertedInput = Number.parseInt(input)
  for (let index = ranges.length - 1; index >= 0; index--) {
      if (convertedInput > ranges[index].divider) {
          let quotient = convertedInput / ranges[index].divider;

          if (quotient < 10) {
              quotient = Math.floor(quotient * 10) / 10;
          } else {
              quotient = Math.floor(quotient);
          }

          return quotient.toString() + ranges[index].suffix;
      }
  }

  return convertedInput.toString();
}


export const formatVideoDate = (input:string)=> {
  return moment(input).fromNow()
}
