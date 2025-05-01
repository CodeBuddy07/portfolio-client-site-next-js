/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
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
import { X, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { IProject } from "@/app/api/_models/ProjectModel";
import { toast } from "sonner";
import { useUpdateProject } from "@/Tanstack/Project/useUpdateProject";

type EditProjectDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  project: IProject;
};

type EditableProject = {
  _id: string;
  title: string;
  description: string;
  status: string;
  category: string;
  startDate: string;
  deadline: string;
  budget: number;
  techStacks: string[];
  liveURL: string;
  gitHubURL: string;
  clientName: string;
  clientContact: string;
  visible: boolean;
  imgDeleteURL?: string;
  imgDisplayURL?: string;
};

export function EditProjectDialog({ 
  isOpen, 
  onClose, 
  project 
}: EditProjectDialogProps) {
  const [editedProject, setEditedProject] = useState<EditableProject>({
    _id: "",
    title: "",
    description: "",
    status: "pending",
    category: "next-js",
    startDate: "",
    deadline: "",
    budget: 0,
    techStacks: [],
    liveURL: "",
    gitHubURL: "",
    clientName: "",
    clientContact: "",
    visible: true,
  });
  
  const [techStackInput, setTechStackInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  
  // Reset form when project changes
  useEffect(() => {
    if (project) {
      const projectData: EditableProject = {
        _id: project._id || "",
        title: project.title || "",
        description: project.description || "",
        status: project.status || "pending",
        category: project.category || "next-js",
        startDate: project.startDate || "",
        deadline: project.deadline || "",
        budget: project.budget || 0,
        techStacks: project.techStacks || [],
        liveURL: project.liveURL || "",
        gitHubURL: project.gitHubURL || "",
        clientName: project.clientName || "",
        clientContact: project.clientContact || "",
        visible: project.visible !== undefined ? project.visible : true,
        imgDisplayURL: project.imgDisplayURL

      };
      
      setEditedProject(projectData);
      
      // Reset image preview if there's an image URL in the project
      if (project.imgDisplayURL) {
        setPreviewUrl(project.imgDisplayURL);
      } else {
        setPreviewUrl(null);
      }
    }
  }, [project]);

  const handleChange = (field: keyof EditableProject, value: any) => {
    setEditedProject((prev) => ({ ...prev, [field]: value }));
  };

  const addTechStack = () => {
    if (techStackInput.trim() && !editedProject.techStacks.includes(techStackInput.trim())) {
      setEditedProject((prev) => ({
        ...prev,
        techStacks: [...prev.techStacks, techStackInput.trim()],
      }));
      setTechStackInput("");
    }
  };

  const removeTechStack = (stack: string) => {
    setEditedProject((prev) => ({
      ...prev,
      techStacks: prev.techStacks.filter(s => s !== stack),
    }));
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFile(file);
      setPreviewUrl(url);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = async () => {
    if (previewUrl && !previewUrl.startsWith('http')) {
      URL.revokeObjectURL(previewUrl); 
    }
    setPreviewUrl(null);
    setFile(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleTechStackKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechStack();
    }
  };

  const isFormValid = () => {
    return (
      editedProject.title.trim() !== "" &&
      editedProject.description.trim() !== "" &&
      editedProject.category.trim() !== "" &&
      editedProject.startDate.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) return;
    
    const formData = new FormData();
    formData.append("_id", editedProject._id);
    if (editedProject.imgDeleteURL) {
      formData.append("imgDeleteURL", editedProject.imgDeleteURL);
    }
    
    if (file) formData.append("file", file);
    
    Object.entries(editedProject).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        key !== "techStacks" && // handle separately
        key !== "imageUrl" && // don't need to send the image URL
        key !== "_id" // already added
      ) {
        formData.append(key, String(value));
      }
    });
    
    if (Array.isArray(editedProject.techStacks)) {
      editedProject.techStacks.forEach((stack) => {
        if (stack) formData.append(`techStacks[]`, stack);
      });
    }
    
    updateProject({id: editedProject._id, data: formData}, {
      onSuccess: (data) => {
        console.log("Project updated successfully:", data);
        toast.success("Project updated successfully");
        onClose();
      },
      onError: (err) => {
        console.error("Project update failed:", err);
        const errorMessage = (err as any)?.response?.data?.error || "Project update failed. Please try again.";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-y-auto max-h-[90vh] scroll-smooth">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Project</DialogTitle>
          <DialogDescription>
            Update the project details below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Project Basics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input 
                id="title"
                value={editedProject.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter project title"
                className="w-full"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                onValueChange={(value) => handleChange("category", value)}
                value={editedProject.category}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="next-js">Next JS</SelectItem>
                  <SelectItem value="vite">Vite</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea 
              id="description"
              value={editedProject.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe your project in detail"
              rows={5}
              required
            />
          </div>
          
          {/* Status & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select 
                onValueChange={(value: "completed" | "in-progress" | "pending") => 
                  handleChange("status", value)
                }
                value={editedProject.status}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Budget ($) *</Label>
              <Input 
                id="budget"
                type="number"
                value={editedProject.budget || ""}
                onChange={(e) => handleChange("budget", e.target.value ? Number(e.target.value) : 0)}
                placeholder="Project budget"
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="visible">Visibility</Label>
              <Select
                onValueChange={(value) => handleChange("visible", value === "true")}
                value={editedProject.visible ? "true" : "false"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Visible</SelectItem>
                  <SelectItem value="false">Hidden</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input 
                id="startDate"
                type="date"
                value={editedProject.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline *</Label>
              <Input 
                id="deadline"
                type="date"
                value={editedProject.deadline || ""}
                onChange={(e) => handleChange("deadline", e.target.value)}
                required
              />
            </div>
          </div>
          
          {/* Client Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Input 
                id="clientName"
                value={editedProject.clientName || ""}
                onChange={(e) => handleChange("clientName", e.target.value)}
                placeholder="Client name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientContact">Client Contact *</Label>
              <Input 
                id="clientContact"
                value={editedProject.clientContact || ""}
                onChange={(e) => handleChange("clientContact", e.target.value)}
                placeholder="Email or phone number"
                required
              />
            </div>
          </div>
          
          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="liveURL">Live URL</Label>
              <Input 
                id="liveURL"
                value={editedProject.liveURL || ""}
                onChange={(e) => handleChange("liveURL", e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gitHubURL">GitHub URL</Label>
              <Input 
                id="gitHubURL"
                value={editedProject.gitHubURL || ""}
                onChange={(e) => handleChange("gitHubURL", e.target.value)}
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>
          
          {/* Project Preview Image */}
          <div className="space-y-4">
            <Label>Project Preview Image {previewUrl ? "" : "*"}</Label>
            <input
              name="image"
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            {previewUrl ? (
              <div className="relative w-full h-56 md:h-64 border rounded-md overflow-hidden">
                <Image
                  src={previewUrl}
                  alt="Project preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1.5 hover:bg-opacity-70 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                onClick={triggerFileInput}
                className="w-full h-44 md:h-56 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-stone-800 transition-colors"
              >
                <ImageIcon size={40} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload project image</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}
          </div>
          
          {/* Tech Stack */}
          <div className="space-y-4">
            <Label>Tech Stack *</Label>
            <div className="flex items-center space-x-2">
              <Input
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                onKeyDown={handleTechStackKeyDown}
                placeholder="Add technology"
              />
              <Button
                type="button"
                onClick={addTechStack}
                variant="outline"
                className="whitespace-nowrap"
              >
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 min-h-8">
              {editedProject.techStacks.map((tech) => (
                <div key={tech} className="flex items-center bg-gray-100 dark:bg-stone-800 rounded px-2 py-1 animate-fadeIn">
                  <span className="text-sm">{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTechStack(tech)}
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {editedProject.techStacks.length === 0 && (
                <span className="text-sm text-gray-500">No technologies added yet</span>
              )}
            </div>
          </div>
          
          <DialogFooter className="pt-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating || !isFormValid()}
              className="w-full sm:w-auto"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Project"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}