export const dateSetting = (day, setChosenDay) => {
  if (day) {
    const arrDay = day.split(/-/);

    const giorno = `${arrDay[2] + "/" + arrDay[1] + "/" + arrDay[0]}`;
    setChosenDay(new Date(giorno));
  } else {
    null;
  }
};

export const showDay = (
  date,
  setChosenDay,
  id,
  setSelectDate,
  setDaySelected,
  daySelected,
  timezone,
  router
) => {
  setSelectDate(date);
  setDaySelected(!daySelected);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dayCurrent = `${day + "-" + month + "-" + year}`;
  const dayReplace = `${year + "/" + month + "/" + day}`;

  setChosenDay(new Date(dayReplace));
  router.push(`/${id}/${timezone}/${dayCurrent}`);
};

export const changeDay = (date, setChosenDay, setSelectDay) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dayCurrent = `${day + "-" + month + "-" + year}`;
  const dayReplace = `${year + "/" + month + "/" + day}`;

  setSelectDay(dayCurrent);
  setChosenDay(new Date(dayReplace));
};

export const updateDaySelected = (chosenDay, setSelectDay) => {
  const day = chosenDay.getDate();
  const month = chosenDay.getMonth() + 1;
  const year = chosenDay.getFullYear();
  const dayCurrent = `${day + "-" + month + "-" + year}`;

  setSelectDay(dayCurrent);
};
