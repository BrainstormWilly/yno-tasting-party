export const UtcToLocalTimeFromNowFilter = ()=>{
  return (date_str) => {
    return moment(date_str).local().fromNow();
  }
}
