"use strict";
var username = "Vlad";
var age = 20;
var isAdmin = true;
function describeUser(name, years, admin) {
    var role = admin ? "адміністратор" : "користувач";
    return "Користувач: ".concat(name, ", Вік: ").concat(years, ", Роль: ").concat(role);
}
console.log(describeUser(username, age, isAdmin));
