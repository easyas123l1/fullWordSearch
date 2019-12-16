exports.seed = function(knex) {
  return knex("users").insert([
    { id: 1, username: "andrew", password: "asdfasdf" },
    { id: 2, username: "addison", password: "asdfasdf" },
    { id: 3, username: "crystal", password: "asdfasdf" }
  ]);
};
