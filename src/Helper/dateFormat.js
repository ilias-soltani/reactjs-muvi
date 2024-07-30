const dateFormat = (date) => {
  // 2023-07-19
  if (date) {
    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const dateArr = date.split("-");

    return `${
      monthNames[
        dateArr[1].startsWith("0") ? dateArr[1].charAt("1") - 1 : dateArr[1] - 1
      ]
    } ${dateArr[2]}, ${dateArr[0]}`;
  }
};

export default dateFormat;
