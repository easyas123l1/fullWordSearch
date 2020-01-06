exports.seed = function(knex) {
  return knex("roles").insert([
    { id: 1, role: "family" },
    { id: 2, role: "agent" },
    { id: 3, role: "admin" }
  ]);
};
