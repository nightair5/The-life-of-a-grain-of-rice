export type JourneyMilestone = "seed" | "harvest" | "compare";

const journeyCopy: Record<JourneyMilestone, string> = {
  seed: "入土",
  harvest: "收割",
  compare: "选择",
};

export function getJourneySummary(milestones: JourneyMilestone[]) {
  const completed = milestones.map((milestone) => journeyCopy[milestone]);

  if (completed.length === 0) {
    return "你已陪一粒米走到最后一餐。";
  }

  if (completed.length === 1) {
    return `你已完成${completed[0]}，把这份看见变成一次行动。`;
  }

  return `你已完成${completed.join("、")}，把这份看见变成一次行动。`;
}
