const runtimeFormat = (time) => {
  // 114

  if (time) {
    const newTime = time / 60;
    if (newTime % 1 === 0) return `${newTime}h`;
    else return `${newTime.toString().split(".")[0]}h ${time % 60}m`;
  }
};

export default runtimeFormat;
