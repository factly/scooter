export const maker = string => {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export const getFormattedDate = date => {
  // Convert the input date to a Date object
  const inputDate = new Date(date);

  // Calculate the IST time (Hyderabad timezone)
  const hyderabadTimezoneOffset = 330; // IST offset in minutes (UTC+05:30)
  const istTime = new Date(
    inputDate.getTime() + hyderabadTimezoneOffset * 60 * 1000
  );

  // Format the date in the desired format
  const formattedDate = istTime.toISOString().slice(0, 19) + "+05:30";
  return formattedDate;
};
