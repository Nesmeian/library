import { Grid } from "./grid.js";
import { WorkItem } from "./workItem.js";
const game = document.querySelector(".board");

const grid = new Grid(game);
grid.getRandomPlace().linkWorkItem(new WorkItem(game));
grid.getRandomPlace().linkWorkItem(new WorkItem(game));
