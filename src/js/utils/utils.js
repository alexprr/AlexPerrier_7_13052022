// capitalize first letter
export const capitalizeString = (word) =>
  `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;

// normalize class names
export const normalizer = (data) => {
  data = data.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  data = data.split(" ").join("-");
  data = data.replace("'", "-");
  return data;
};
