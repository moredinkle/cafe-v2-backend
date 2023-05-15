import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { AppDataSource } from "./database/data-source";
import { envConfig } from './env-config';
import bodyParser from "body-parser";

import errorMiddleware from "./utils/error-middleware";
import MenuRoutes from "./API/routes/menu.routes";
import MenuItemRoutes from "./API/routes/menu-item.routes";
import OrderRoutes from "./API/routes/order.routes";
import OrderItemRoutes from "./API/routes/order-item.routes";
import MenuExtraRoutes from "./API/routes/menu-extra.routes";

async function startServer() {
  const app = express();
  const port = 3000;

  await AppDataSource.initialize();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: envConfig.frontendUri,
    })
  );
  app.use("/api/v2/menus", MenuRoutes);
  app.use("/api/v2/menus", MenuItemRoutes);
  app.use("/api/v2/menus", MenuExtraRoutes);
  app.use("/api/v2/orders", OrderRoutes);
  app.use("/api/v2/orders", OrderItemRoutes);
  app.use(errorMiddleware);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
