export const UtcToLocalTimeToNowFilter = ()=>{
  return (date_str) => {
    return moment(date_str).local().toNow();
  }
}
