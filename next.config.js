
module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/*",
        destination: "https://api.openweathermap.org/*",
      },
    ];
  };
  return {
    rewrites,
  };
};
