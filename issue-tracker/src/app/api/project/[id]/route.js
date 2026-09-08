import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Project from "@/models/project";
import Issue from "@/models/issue";
import { getCurrentUser } from "@/lib/auth";

// GET ONE PROJECT
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

    const project = await Project.findOne({
      _id: id,
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

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get project error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch project",
      },
      { status: 500 }
    );
  }
}

// UPDATE PROJECT
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

    const body = await request.json();

    const updateData = {};

    if (body.name !== undefined) {
      updateData.name = body.name.trim();
    }

    if (body.description !== undefined) {
      updateData.description = body.description.trim();
    }

    if (body.key !== undefined) {
      updateData.key = body.key.trim().toUpperCase();
    }

    const project = await Project.findOneAndUpdate(
      {
        _id: id,
        ownerId: user._id,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update project",
      },
      { status: 500 }
    );
  }
}

// DELETE PROJECT
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

    const project = await Project.findOneAndDelete({
      _id: id,
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

    // Delete all issues belonging to this project.
    await Issue.deleteMany({
      projectId: id,
    });

    return NextResponse.json({
      success: true,
      message: "Project and its issues deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete project",
      },
      { status: 500 }
    );
  }
}