export const formatDate = (dateString: string): string => {
  const dateTime = new Date(dateString);
  return dateTime.toISOString().split("T")[0];
};

export default formatDate;
