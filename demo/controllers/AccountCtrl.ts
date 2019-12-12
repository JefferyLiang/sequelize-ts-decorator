import { Controller, Get } from "express-ts-decorator";
import { Request } from "express";
import { Account } from "../entity/Account";

@Controller("/api/accounts")
export class AccountCtrl {
  @Get("")
  public async list(req: Request) {
    const PAGE = parseInt(req.query.page, 10) || 1;
    const SIZE = parseInt(req.query.size, 10) || 20;
    return await Account.findAndCountAll({
      limit: SIZE,
      offset: (PAGE - 1) * SIZE
    });
  }
}
