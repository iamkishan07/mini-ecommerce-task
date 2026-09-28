import app from "./app/app.js";
import config from "./config/config.js";
import { connectToDB } from "./config/db.js";

await connectToDB();

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
