const thDate = (date) => {
  const dt = new Date(date);
  const resultDate = dt.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const resultTime = dt.toLocaleTimeString("th-TH");

  return {
    date: resultDate,
    time: resultTime,
    full: resultDate + " " + resultTime + "น.",
  };
};

export default thDate;
