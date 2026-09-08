export const normalizeStatus = (status) =>
  String(status || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");

export const matchesStatus = (issueStatus, targetType) => {
  if (!issueStatus) return false;
  const s = normalizeStatus(issueStatus);

  if (targetType === "OPEN") {
    return s === "open" || s === "todo" || s === "backlog";
  }
  if (targetType === "IN-PROGRESS") {
    return s === "inprogress" || s === "doing" || s === "inreview";
  }
  if (targetType === "CLOSED") {
    return s === "closed" || s === "done" || s === "completed" || s === "resolved";
  }
  return false;
};