module.exports = {
  async up(db) {
    return await db.collection("special_avatars").insertMany(
      [
        {
          icon: "DRAGON",
          powerUpAmount: 6,
          createdBy: "admin",
          createdAt: new Date(),
        },
        {
          icon: "WIZARD",
          powerUpAmount: 6,
          createdBy: "admin",
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(db, client) {
    return await db.collection("special_avatars").deleteMany({});
  },
};
