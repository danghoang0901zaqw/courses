const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const SortMiddleware = require("../src/middleware/SortMiddleware");
const db = require("./config/db");

db.connect();

const route = require("./routes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(SortMiddleware);
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

// app.use(morgan("combined"));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum(a, b) {
        return a + b;
      },
      sortable(field, sort) {
        const icons = {
          default: "oi oi-elevator",
          asc: "oi oi-sort-ascending",
          desc: "oi oi-sort-descending",
        };
        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };
        let icon = icons[sort.type];
        const type = types[sort.type];
        if (field !== sort.column) icon = icons["default"];

        return `<a href="?_sort&column=${field}&type=${type}"><span
        class='${icon}'
      ></span></a>`;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
