const CalculateFiscalYear = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0 is January, 11 is December

  // Calculate the financial year
  let financialYear;
  if (currentMonth >= 6) {
    // From July (6) to December (11)
    financialYear = `${currentYear}-${currentYear + 1}`;
  } else {
    // From January (0) to June (5)
    financialYear = `${currentYear - 1}-${currentYear}`;
  }
  return financialYear;
};

export default CalculateFiscalYear;
