type ArraysData = {
  numbers: string[],
  low: string[],
  large: string[],
  symbols: string[],
};

const arrays: ArraysData = {
  "numbers": ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  "low": ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  "large": ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  "symbols": ['/', '*', '-', '_', ')', '.', '$'],
};

export default defineEventHandler(async (event: any) => {
  const { options, length, quantity } = await readBody(event);

  function colaps() {
    let result: string[] = [];

    if (options.length===0) {
      for (const [key, value] of Object.entries(arrays)) {
        const field: string[] = arrays[key];
        if (field) {
          result.push(field[Math.floor(Math.random() * field.length)]);
        }
      }
    }
    else {
      for (const o of options) {
        const field: string[] = arrays[o];
        if (field) {
          result.push(field[Math.floor(Math.random() * field.length)]);
        }
      }
    }

    return result[Math.floor(Math.random() * result.length)];
  }

  function checkedRemuv(place: any): string {
    if (options.includes('repeat') || options.length===0) {
      const item = colaps();
      if (place.includes(item)) {
          return checkedRemuv(place);
      }
      return item;
    } 
    else return colaps();
  }

  let passwords: string[] = [];

  for (let j=1; j<=quantity; j++) {
    let password: string[] = [];
    for (let i=1; i<=length; i++) {
        password.push(checkedRemuv(password));
    }
    passwords.push(password.join(''));
  }

  return passwords;
})