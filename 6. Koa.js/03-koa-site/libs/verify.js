module.exports = (projectName, projectUrl, text) => {
  let response;
  if (projectName === "") {
    response = {
      mes: "Не загружена название проекта",
      status: "Error"
    };
  }
  if (projectUrl === "") {
    response = {
      mes: "Не загружена url адрес проекта",
      status: "Error"
    };
  }
  if (text === "") {
    response = {
      mes: "Не загруженo описание проекта",
      status: "Error"
    };
  }
  return response;
};
