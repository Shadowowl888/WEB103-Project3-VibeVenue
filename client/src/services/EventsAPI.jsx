const fetchAllEvents = async () => {
  const response = await fetch("/events");
  const data = await response.json();
};
