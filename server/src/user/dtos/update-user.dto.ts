import { PartialType } from "@nestjs/swagger";
import { NewUserDTO } from "./new-user.dto";

export class UpdateUserDTO extends PartialType(NewUserDTO) { }