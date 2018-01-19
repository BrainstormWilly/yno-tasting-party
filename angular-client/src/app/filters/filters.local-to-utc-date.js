export const LocalToUtcDateFilter = ()=>{
  return date_str => {
    return moment(date_str).utc().format();
  }
}
