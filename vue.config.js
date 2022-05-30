module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    proxy: "https://flask-training-sarah.herokuapp.com",
  },
};
