import { prisma } from "@/lib/prisma";
import { getSoftwareBySlug } from "./software.query";
import { getFirstSettingById } from "./setting.query";
import { syncGenerateSlug } from "../helpers/generateSlug";
