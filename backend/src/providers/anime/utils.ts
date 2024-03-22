import dayjs from "dayjs";

export function convertDate({year, month, day}: {year?: number, month?: number, day?: number}): string|undefined {
  if ( year !== null && year !== undefined ) {
    return dayjs()
            .set('year', year)
            .set('month', month as number)
            .set('day', day as number)
            .format('YYYY-MM-DD')
  }
  return undefined;
}