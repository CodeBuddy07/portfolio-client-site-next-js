/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/projects/add-project-dialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

type Project = {
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

type AddProjectDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: Omit<Project, "id">) => void;
};

export function AddProjectDialog({ isOpen, onClose, onAdd }: AddProjectDialogProps) {
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    status: "planned",
    category: "next-js",
    startDate: new Date().toISOString().split("T")[0],
    techStacks: [],
  });
  
  const [techStackInput, setTechStackInput] = useState("");

  const handleChange = (field: keyof Omit<Project, "id">, value: any) => {
    setNewProject({ ...newProject, [field]: value });
  };

  const addTechStack = () => {
    if (techStackInput.trim() && !newProject.techStacks.includes(techStackInput.trim())) {
      setNewProject({
        ...newProject,
        techStacks: [...newProject.techStacks, techStackInput.trim()],
      });
      setTechStackInput("");
    }
  };

  const removeTechStack = (stack: string) => {
    setNewProject({
      ...newProject,
      techStacks: newProject.techStacks.filter(s => s !== stack),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newProject);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new project to your portfolio.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input 
                id="title"
                value={newProject.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter project title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                onValueChange={(value: "react" | "next-js" | "vite") => handleChange("category", value)}
                defaultValue={newProject.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="next-js">Next JS</SelectItem>
                  <SelectItem value="vite">Vite</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea 
              id="description"
              value={newProject.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe your project"
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select 
                onValueChange={(value: "completed" | "in-progress" | "planned") => handleChange("status", value)}
                defaultValue={newProject.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input 
                id="budget"
                type="number"
                value={newProject.budget || ""}
                onChange={(e) => handleChange("budget", e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Project budget"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input 
                id="startDate"
                type="date"
                value={newProject.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="finishDate">Finish Date</Label>
              <Input 
                id="finishDate"
                type="date"
                value={newProject.finishDate || ""}
                onChange={(e) => handleChange("finishDate", e.target.value || undefined)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="liveLink">Live Link</Label>
              <Input 
                id="liveLink"
                value={newProject.liveLink || ""}
                onChange={(e) => handleChange("liveLink", e.target.value || undefined)}
                placeholder="https://example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="repoLink">Repository Link</Label>
              <Input 
                id="repoLink"
                value={newProject.repoLink || ""}
                onChange={(e) => handleChange("repoLink", e.target.value || undefined)}
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <Label>Tech Stack</Label>
            <div className="flex items-center space-x-2">
              <Input
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                placeholder="Add technology"
              />
              <Button type="button" onClick={addTechStack} variant="outline">
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {newProject.techStacks.map((tech) => (
                <div key={tech} className="flex items-center bg-gray-100 dark:bg-stone-800 rounded px-2 py-1">
                  <span className="text-sm">{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTechStack(tech)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {newProject.techStacks.length === 0 && (
                <span className="text-sm text-gray-500">No technologies added yet</span>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="extraInfo">Additional Information</Label>
            <Textarea 
              id="extraInfo"
              value={newProject.extraInfo || ""}
              onChange={(e) => handleChange("extraInfo", e.target.value || undefined)}
              placeholder="Any additional details about the project"
              rows={2}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!newProject.title || !newProject.description || !newProject.category}>
              Add Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

