const fastify = require("fastify");
const fastify_static = require("fastify-static");

let app = fastify();

app.use((req, resp, next) => {
    resp.setHeader("Cache-Control", "public, max-age=604800");
    resp.setHeader("Access-Control-Allow-Origin", "*");

    next();
});

app.register(fastify_static, {
    root: __dirname,
    prefix: "/",
});

app.listen(80, "0.0.0.0", () => {
    console.log("[WeishanCloud.UI] Server started on 0.0.0.0:80");
});
