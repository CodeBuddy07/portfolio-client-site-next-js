"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteProject } from "@/Tanstack/Project/useDeleteProject";
import { toast } from "sonner";


type DeleteProjectDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
  };
};




export function DeleteProjectDialog({ isOpen, onClose, project  }: DeleteProjectDialogProps) {

  const { mutate: deleteProject, isPending } = useDeleteProject();

  const onDelete = async () => {
    deleteProject(project.id, {
      onSuccess: () => {
        toast.success("Project deleted successfully.");
        onClose();
      },
      onError: (error) => {
        console.error("Error deleting project:", error);
        toast.error("Failed to delete project. Please try again.");
      },
    });
    
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the project <span className="font-medium">{project.title}</span>. 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700">
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}