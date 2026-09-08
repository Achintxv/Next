import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Issue from "@/models/issue";
import Project from "@/models/project";
import { getCurrentUser } from "@/lib/auth";

// =====================================================
// GET ISSUES
// /api/issue?projectId=PROJECT_ID
// =====================================================

export async function GET(request) {
  try {
    await connectDB();

    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);

    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        {
          success: false,
          message: "projectId is required",
        },
        { status: 400 }
      );
    }

    // Make sure the project belongs to the logged-in user.
    const project = await Project.findOne({
      _id: projectId,
      ownerId: user._id,
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    const issues = await Issue.find({
      projectId: project._id,
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      issues,
    });
  } catch (error) {
    console.error("Get issues error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch issues",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// CREATE ISSUE
// /api/issue
// =====================================================

export async function POST(request) {
  try {
    await connectDB();

    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const title = body.title?.trim();
    const description = body.description?.trim() || "";
    const status = body.status || "open";
    const priority = body.priority || "medium";
    const projectId = body.projectId;

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "Issue title is required",
        },
        { status: 400 }
      );
    }

    if (!projectId) {
      return NextResponse.json(
        {
          success: false,
          message: "projectId is required",
        },
        { status: 400 }
      );
    }

    // Verify project ownership.
    const project = await Project.findOne({
      _id: projectId,
      ownerId: user._id,
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    const issue = await Issue.create({
      title,
      description,
      status,
      priority,
      projectId: project._id,
      createdBy: user._id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Issue created successfully",
        issue,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create issue error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create issue",
      },
      { status: 500 }
    );
  }
}