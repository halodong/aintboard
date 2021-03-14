module.exports = {
  async up(db, client) {
    return await db.collection("review_status").insertMany(
      [
        {
          id: 1,
          status: "PENDING",
        },
        {
          id: 2,
          status: "APPROVED",
        },
        {
          id: 3,
          status: "REJECTED",
        },
      ],
      {}
    );
  },

  async down(db, client) {
    return await db.collection("review_status").deleteMany({});
  },
};
