import { Controller, Get } from "express-ts-decorator";
import { Request } from "express";
import { Account } from "../entity/Account";

@Controller("/api/accounts")
export class AccountCtrl {
  @Get("")
  public async list(req: Request) {
    console.log(req);
    return await Account.findAndCountAll();
  }
}
