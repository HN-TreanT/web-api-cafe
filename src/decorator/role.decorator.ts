import { SetMetadata } from "@nestjs/common";
import { ROLES } from "src/constants/role.enum";

export const ROLES_KEY = "roles";
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
