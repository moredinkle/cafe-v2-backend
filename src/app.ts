import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { AppDataSource } from "./database/data-source";
import { envConfig } from './env-config';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import errorMiddleware from "./utils/error-middleware";
import {authMiddleware} from "./utils/auth-middleware";
import MenuRoutes from "./API/routes/menu.routes";
import MenuItemRoutes from "./API/routes/menu-item.routes";
import OrderRoutes from "./API/routes/order.routes";
import OrderItemRoutes from "./API/routes/order-item.routes";
import MenuExtraRoutes from "./API/routes/menu-extra.routes";
import UserRoutes from "./API/routes/user.routes";

async function startServer() {
  const app = express();
  const port = 3000;

  await AppDataSource.initialize();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: envConfig.frontendUri,
    })
  );

  app.use("/api/v2/menus", authMiddleware, MenuRoutes);
  app.use("/api/v2/menus", authMiddleware, MenuItemRoutes);
  app.use("/api/v2/menus", authMiddleware, MenuExtraRoutes);
  app.use("/api/v2/orders", authMiddleware, OrderRoutes);
  app.use("/api/v2/orders", authMiddleware, OrderItemRoutes);
  app.use("/api/v2/auth", UserRoutes);
  app.use(errorMiddleware);


  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
