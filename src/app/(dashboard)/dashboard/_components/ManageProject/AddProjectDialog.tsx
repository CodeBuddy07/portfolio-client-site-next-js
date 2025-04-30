/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/projects/add-project-dialog.tsx
"use client";

import { useState, useRef } from "react";
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
import { X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

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
  previewImage?: string;
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Convert image to base64 string for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("previewImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    handleChange("previewImage", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newProject);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="min-w-3xl overflow-y-auto max-h-[90vh] scroll-smooth">
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
                className="w-full"
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
              rows={6}
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
            <Label>Project Preview Image</Label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            {previewUrl ? (
              <div className="relative w-full h-48 border rounded-md overflow-hidden">
                <Image 
                  src={previewUrl} 
                  alt="Project preview" 
                  className="w-full h-full object-cover"
                  layout="fill"
                  objectFit="cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div 
                onClick={triggerFileInput}
                className="w-full h-40 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-stone-800"
              >
                <ImageIcon size={40} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload project image</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}
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