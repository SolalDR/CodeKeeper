# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Intégration
Lang.create(cd: "html", lib: "html", bgColor: "#E44B23", color: "#ffffff", cdMirror:"htmlmixed");
Lang.create(cd: "js", lib: "javascript", bgColor: "#f1e05a", color: "#000000", cdMirror:"javascript");
Lang.create(cd: "css", lib: "css", bgColor: "#563d7c", color: "#ffffff", cdMirror:"x-scss");
Lang.create(cd: "scss", lib: "scss", bgColor: "#CF649A", color: "#ffffff", cdMirror:"scss");
Lang.create(cd: "sass", lib: "sass", bgColor: "#CF649A", color: "#ffffff", cdMirror:"javascript");
Lang.create(cd: "json", lib: "json", bgColor: "#f1e05a", color: "#000000", cdMirror:"json");

# Back
Lang.create(cd: "php", lib: "php", bgColor: "#4F5D95", color: "#ffffff", cdMirror:"php");
Lang.create(cd: "rb", lib: "ruby", bgColor: "#a61414", color: "#ffffff", cdMirror:"ruby");
Lang.create(cd: "java", lib: "java", bgColor: "#b07219", color: "#ffffff", cdMirror:"javascript");
Lang.create(cd: "c", lib: "c", bgColor: "#555555", color: "#ffffff", cdMirror:"javascript");
Lang.create(cd: "swift", lib: "swift", bgColor: "#ffac45", color: "#000000", cdMirror:"javascript");
