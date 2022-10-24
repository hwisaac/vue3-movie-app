exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: "heropy",
      age: 30,
      email: "abcd@naver.com",
    }),
  };
};
