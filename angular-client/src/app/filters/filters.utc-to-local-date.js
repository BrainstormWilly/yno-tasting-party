export const UtcToLocalDateFilter = ()=>{
  return (date_str, format) => {
    if( !format ) format = "lll"
    return moment(date_str, "YYYY-MM-DDTHH:mm:ss.SSSZ").local().format(format);
  }
}
