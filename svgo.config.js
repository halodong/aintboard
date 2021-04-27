module.exports = {
  js2svg: {
    indent: 2, // string with spaces or number of spaces. 4 by default
    pretty: true, // boolean, false by default
  },
  plugins: [
    {
      name: "cleanupIDs",
      active: false,
    },
    {
      name: "removeXMLNS",
      active: false,
    },
  ],
};
