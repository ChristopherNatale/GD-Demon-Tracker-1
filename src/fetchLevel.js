import fs from "node:fs/promises";
import Client from "gd.js";
import GD from "gd.js";

export async function fetchLevel(data) {
    const gd = new GD({
        logLevel: 2
    });
        const response = await gd.levels.get(data.levelName);
        console.log(response.levelName);
}

