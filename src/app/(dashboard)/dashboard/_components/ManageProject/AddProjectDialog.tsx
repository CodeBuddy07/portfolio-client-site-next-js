/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { X, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { useCreateProject } from "@/Tanstack/Project/useCreateProject";
import { toast } from "sonner";





type AddProjectDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddProjectDialog({ isOpen, onClose }: AddProjectDialogProps) {

  type NewProjectState = {
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
  };
  
  const [newProject, setNewProject] = useState<NewProjectState>({
    title: "",
    description: "",
    status: "pending",
    category: "next-js",
    startDate: format(new Date(), "yyyy-MM-dd"),
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

  const handleChange = (field: keyof Omit<NewProjectState, "_id">, value: any) => {
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
    if ( previewUrl){
      URL.revokeObjectURL(previewUrl); 
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const { mutate: createProject, isPending: isSubmitting } = useCreateProject();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!isFormValid() || !file) return;
  
    const formData = new FormData();

    if (file) formData.append("file", file);
    
    Object.entries(newProject).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        key !== "techStacks" // handle separately
      ) {
        formData.append(key, String(value));
      }
    });
    
    if (Array.isArray(newProject.techStacks)) {
      newProject.techStacks.forEach((stack) => {
        if (stack) formData.append(`techStacks[]`, stack); // send as array (no index needed)
      });
    }
    

      createProject(formData, {
        onSuccess: () => {
          toast.success("Project created successfully");
          resetForm(); // Reset the form after successful submission
        },
        onError: (err) => {
          console.error("Project creation failed:", err);
          const errorMessage = (err as any)?.response?.data?.error || "Project creation failed. Please try again.";
          toast.error(errorMessage);
        },
      });

      

      
  };
  

  const isFormValid = () => {
    return (
      newProject.title.trim() !== "" &&
      newProject.description.trim() !== "" &&
      newProject.category.trim() !== "" &&
      newProject.startDate.trim() !== "" &&
      newProject.deadline.trim() !== "" &&
      previewUrl !== null &&
      newProject.techStacks.length !== 0
    );
  };

  const resetForm = async () => {

    if (previewUrl) {

      setPreviewUrl(null);
    }

    setNewProject({
          title: "",
          description: "",
          status: "pending",
          category: "next-js",
          startDate: format(new Date(), "yyyy-MM-dd"),
          deadline: "",
          budget: 0,
          techStacks: [],
          liveURL: "",
          gitHubURL: "",
          clientName: "",
          clientContact: "",
          visible: true,
        });



    setTechStackInput("");
  };

  const handleTechStackKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechStack();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent className=" overflow-y-auto max-h-[90vh] scroll-smooth">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new project to your portfolio.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Project Basics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 md:col-span-2">
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
                onValueChange={(value) => handleChange("category", value)}
                defaultValue={newProject.category}
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
              value={newProject.description}
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
                onValueChange={(value: "completed" | "in-progress" | "pending") => handleChange("status", value)}
                defaultValue={newProject.status}
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
                value={newProject.budget || ""}
                onChange={(e) => handleChange("budget", e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Project budget"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visible">Visibility</Label>
              <Select
                onValueChange={(value) => handleChange("visible", value === "true")}
                defaultValue={newProject.visible ? "true" : "false"}
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
                value={newProject.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline *</Label>
              <Input
                id="deadline"
                type="date"
                value={newProject.deadline || ""}
                onChange={(e) => handleChange("deadline", e.target.value)}
              />
            </div>
          </div>

          {/* Client Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={newProject.clientName || ""}
                onChange={(e) => handleChange("clientName", e.target.value)}
                placeholder="Client name"

              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientContact">Client Contact *</Label>
              <Input
                id="clientContact"
                value={newProject.clientContact || ""}
                onChange={(e) => handleChange("clientContact", e.target.value)}
                placeholder="Email or phone number"
              />
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="liveURL">Live URL</Label>
              <Input
                id="liveURL"
                value={newProject.liveURL || ""}
                onChange={(e) => handleChange("liveURL", e.target.value || undefined)}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gitHubURL">GitHub URL</Label>
              <Input
                id="gitHubURL"
                value={newProject.gitHubURL || ""}
                onChange={(e) => handleChange("gitHubURL", e.target.value || undefined)}
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          {/* Project Preview Image */}
          <div className="space-y-4">
            <Label>Project Preview Image *</Label>
            <input
              name="image"
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
              required={!previewUrl} // Make it required if no preview URL
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
              {newProject.techStacks.map((tech) => (
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
              {newProject.techStacks.length === 0 && (
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
              disabled={isSubmitting || !isFormValid()}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Project"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}