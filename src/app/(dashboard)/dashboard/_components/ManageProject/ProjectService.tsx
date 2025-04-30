// app/dashboard/projects/services/project-service.ts
"use client";

import { useCallback } from "react";

export type Project = {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "planned";
  category: string;
  startDate: string;
  finishDate?: string;
  liveLink?: string;
  repoLink?: string;
  techStacks: string[];
  budget?: number;
  extraInfo?: string;
};

// In a real application, these functions would interact with your API
export const useProjectService = () => {
  
  const fetchProjects = useCallback(async (): Promise<Project[]> => {
    // This would be an API call in a real application
    // For now, we'll return mock data from local storage or default data
    try {
      const storedProjects = localStorage.getItem('portfolio-projects');
      if (storedProjects) {
        return JSON.parse(storedProjects);
      }
      
      // Default projects if none in storage
      return defaultProjects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return defaultProjects;
    }
  }, []);
  
  const createProject = useCallback(async (project: Omit<Project, "id">): Promise<Project> => {
    try {
      const projects = await fetchProjects();
      
      // Generate a new ID (in a real app, this would be done by the backend)
      const newProject: Project = {
        ...project,
        id: Date.now().toString(),
      };
      
      const updatedProjects = [...projects, newProject];
      localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));
      
      return newProject;
    } catch (error) {
      console.error('Error creating project:', error);
      throw new Error('Failed to create project');
    }
  }, [fetchProjects]);
  
  const updateProject = useCallback(async (project: Project): Promise<Project> => {
    try {
      const projects = await fetchProjects();
      const index = projects.findIndex(p => p.id === project.id);
      
      if (index === -1) {
        throw new Error('Project not found');
      }
      
      const updatedProjects = [...projects];
      updatedProjects[index] = project;
      
      localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));
      
      return project;
    } catch (error) {
      console.error('Error updating project:', error);
      throw new Error('Failed to update project');
    }
  }, [fetchProjects]);
  
  const deleteProject = useCallback(async (id: string): Promise<boolean> => {
    try {
      const projects = await fetchProjects();
      const updatedProjects = projects.filter(p => p.id !== id);
      
      localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));
      
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw new Error('Failed to delete project');
    }
  }, [fetchProjects]);
  
  return {
    fetchProjects,
    createProject,
    updateProject,
    deleteProject
  };
};

// Default projects for initial setup
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with product listings, shopping cart, and payment integration.",
    status: "completed",
    category: "Web Development",
    startDate: "2024-01-15",
    finishDate: "2024-03-20",
    liveLink: "https://example.com/ecommerce",
    repoLink: "https://github.com/user/ecommerce",
    techStacks: ["Next.js", "TypeScript", "Tailwind", "MongoDB"],
    budget: 5000,
  },
  {
    id: "2",
    title: "Portfolio Website",
    description: "Personal portfolio showcasing projects and skills with interactive elements.",
    status: "in-progress",
    category: "Web Development",
    startDate: "2024-02-10",
    techStacks: ["React", "Tailwind CSS", "Framer Motion"],
    budget: 1200,
  },
  {
    id: "3",
    title: "Task Management App",
    description: "A collaborative task management tool with real-time updates and team collaboration features.",
    status: "planned",
    category: "Mobile App",
    startDate: "2024-04-01",
    techStacks: ["React Native", "Firebase", "Redux"],
    budget: 3800,
  },
  {
    id: "4",
    title: "Weather Dashboard",
    description: "Real-time weather tracking application with location-based forecasts and historical data analysis.",
    status: "completed",
    category: "Web Application",
    startDate: "2023-11-05",
    finishDate: "2024-01-10",
    liveLink: "https://weather-dashboard-demo.com",
    repoLink: "https://github.com/user/weather-dashboard",
    techStacks: ["React", "OpenWeather API", "Chart.js", "Tailwind CSS"],
    budget: 2200,
  },
  {
    id: "5",
    title: "Recipe Sharing Platform",
    description: "Social platform for food enthusiasts to share and discover recipes with rating system.",
    status: "in-progress",
    category: "Web Application",
    startDate: "2024-03-01",
    techStacks: ["Vue.js", "Node.js", "Express", "MongoDB", "AWS S3"],
    budget: 4500,
  }
];