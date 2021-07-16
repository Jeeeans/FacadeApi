
export const addCommasWithNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const addCommas = (x: String) => {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}