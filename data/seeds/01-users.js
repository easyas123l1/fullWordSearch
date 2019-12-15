exports.seed = function(knex) {
  return knex("users").insert([
    { id: 1, name: "andrew" },
    { id: 2, name: "crystal" },
    { id: 3, name: "addison" }
  ]);
};
