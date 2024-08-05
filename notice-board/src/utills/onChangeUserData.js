export const onChangeUserDataHandler = (e, setUserData) => {
  const { name, value } = e.target;
  setUserData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
