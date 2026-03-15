import { db } from "@/lib/db";
import issue from "@/models/issue";

export async function GET(request) {
  await db();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  
  let issues;
  if (status && status !== "ALL") {
    issues = await issue.find({ status });
  } else {
    issues = await issue.find();
  }
  return Response.json(issues);
}

export async function POST(req) {
  await db();
  const body = await req.json();
  const issues = await issue.create({
    title: body.title,
    description: body.description,
    status: body.status,
  });
  return Response.json(issues);
}

export async function PATCH(req) {
  await db();
  const body = await req.json();
  const updatedIssue = await issue.findByIdAndUpdate(
    body.id,
    {
      title: body.title,
      description: body.description,
      status: body.status,
    },
    { new: true },
  );
  return Response.json(updatedIssue);
}

export async function DELETE(req) {
  await db();
  const body = await req.json();
  await issue.findByIdAndDelete(body.id);
  return Response.json({ message: "Deleted" });
}
