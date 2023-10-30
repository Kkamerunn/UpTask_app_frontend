const formatDate = (date) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return newDate.toLocaleDateString("en-EN", options);
};

export { formatDate };
