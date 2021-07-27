const { NODE_ENV } = process.env;
const isProduction = NODE_ENV && NODE_ENV === "production";

module.exports = {
  future: { webpack5: isProduction }, // fix for not reloading page on dev env
  images: {
    domains: ["res.cloudinary.com", "cf.geekdo-images.com"],
  },
};
