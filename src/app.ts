import express from "express";
import { AppDataSource } from "./database/data-source";
import bodyParser from "body-parser";
import errorMiddleware from "./utils/error-middleware";
import MenuRoutes from './API/routes/menu.routes';
import MenuItemRoutes from './API/routes/menu-item.routes';
import OrderRoutes from './API/routes/order.routes';

async function startServer() {
  const app = express();
  const port = 3000;

  await AppDataSource.initialize();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/api/v1/menus", MenuRoutes);
  app.use("/api/v1/menu-items", MenuItemRoutes);
  app.use("api/v1/orders", OrderRoutes);
  app.use(errorMiddleware);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
