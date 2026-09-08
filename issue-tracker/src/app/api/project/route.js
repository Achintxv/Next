import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Project from "@/models/project";
import { getCurrentUser } from "@/lib/auth";

// GET ALL PROJECTS FOR CURRENT USER
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

    const projects = await Project.find({
      ownerId: user._id,
    }).sort({
      createdAt: -1,
    });
    
    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects",
      },
      { status: 500 }
    );
  }
}

// CREATE PROJECT
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

    const name = body.name?.trim();
    const key = body.key?.trim().toUpperCase();
    const description = body.description?.trim() || "";

    if (!name || !key) {
      return NextResponse.json(
        {
          success: false,
          message: "Project name and key are required",
        },
        { status: 400 }
      );
    }

    if (!/^[A-Z0-9_-]+$/.test(key)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Project key can only contain letters, numbers, hyphens and underscores",
        },
        { status: 400 }
      );
    }

    const existingProject = await Project.findOne({
      ownerId: user._id,
      key,
    });

    if (existingProject) {
      return NextResponse.json(
        {
          success: false,
          message: "You already have a project with this key",
        },
        { status: 409 }
      );
    }

    const project = await Project.create({
      name,
      key,
      description,
      ownerId: user._id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create project error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create project",
      },
      { status: 500 }
    );
  }
}