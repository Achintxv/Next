import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Issue from "@/models/issue";
import Project from "@/models/project";
import { getCurrentUser } from "@/lib/auth";

// =====================================================
// GET SINGLE ISSUE
// =====================================================

export async function GET(request, { params }) {
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

    const { id } = await params;

    const issue = await Issue.findById(id);

    if (!issue) {
      return NextResponse.json(
        {
          success: false,
          message: "Issue not found",
        },
        { status: 404 }
      );
    }

    // Verify that the issue's project belongs to the user.
    const project = await Project.findOne({
      _id: issue.projectId,
      ownerId: user._id,
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Issue not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      issue,
    });
  } catch (error) {
    console.error("Get issue error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch issue",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// UPDATE ISSUE
// =====================================================

export async function PATCH(request, { params }) {
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

    const { id } = await params;

    const issue = await Issue.findById(id);

    if (!issue) {
      return NextResponse.json(
        {
          success: false,
          message: "Issue not found",
        },
        { status: 404 }
      );
    }

    // Verify ownership through project.
    const project = await Project.findOne({
      _id: issue.projectId,
      ownerId: user._id,
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Issue not found",
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    if (body.title !== undefined) {
      issue.title = body.title.trim();
    }

    if (body.description !== undefined) {
      issue.description = body.description.trim();
    }

    if (body.status !== undefined) {
      issue.status = body.status;
    }

    if (body.priority !== undefined) {
      issue.priority = body.priority;
    }

    await issue.save();

    return NextResponse.json({
      success: true,
      message: "Issue updated successfully",
      issue,
    });
  } catch (error) {
    console.error("Update issue error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update issue",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE ISSUE
// =====================================================

export async function DELETE(request, { params }) {
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

    const { id } = await params;

    const issue = await Issue.findById(id);

    if (!issue) {
      return NextResponse.json(
        {
          success: false,
          message: "Issue not found",
        },
        { status: 404 }
      );
    }

    // Verify ownership through project.
    const project = await Project.findOne({
      _id: issue.projectId,
      ownerId: user._id,
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Issue not found",
        },
        { status: 404 }
      );
    }

    await Issue.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
    console.error("Delete issue error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete issue",
      },
      { status: 500 }
    );
  }
}