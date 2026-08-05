import type { CaseStudy } from "@/types/case-study";
import { estateAgentPower } from "./estate-agent-power";
import { tiptopRideHailing } from "./tiptop-ride-hailing";
import { tensileIndustrialIot } from "./tensile-industrial-iot";
import { allInOneErp } from "./all-in-one-erp";
import { epcProjectErp } from "./epc-project-erp";
import { calibmate } from "./calibmate";

export const caseStudies: CaseStudy[] = [
  estateAgentPower,
  tiptopRideHailing,
  tensileIndustrialIot,
  allInOneErp,
  epcProjectErp,
  calibmate,
];
