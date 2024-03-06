const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default defineEventHandler(async (event: any) => {
  const { fromYear, toYear, quantity } = await readBody(event);

  function generateDate(): string {
    let day: number = Math.round(Math.random() * 30.5);
    let month: number = Math.round(Math.random() * 11);
    let year: number = Math.round(Math.random() * (toYear - fromYear) + (fromYear * 1.0));

    return `${months[month]} ${day}, ${year}`;
  }

  let dates: string[] = [];

  for (let i=1; i<=quantity; i++) {
    dates.push(generateDate());
  }

  return dates;
})