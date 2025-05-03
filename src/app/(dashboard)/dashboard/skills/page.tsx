"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Image from "next/image";
import { useAdminSkills } from "@/Tanstack/Skills/useAdminSkills";
import { useUpdateSkill } from "@/Tanstack/Skills/useUpdateSkill";
import { useDeleteSkill } from "@/Tanstack/Skills/useDeleteSkill";
import { AddSkillDialog } from "./_components/AddSkillDialog";
import { EditSkillDialog } from "./_components/EditSkillDialog";

interface ISkill {
  _id: string;
  name: string;
  iconURL: string;
  percentage: number;
  visible: boolean;
}

export default function SkillsDashboard() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: skills, isLoading } = useAdminSkills();
  const { mutate: updateSkill } = useUpdateSkill();
  const { mutate: deleteSkill } = useDeleteSkill();

  const filteredSkills = skills?.filter((skill: ISkill) => 
    skill.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleToggleVisibility = (id: string, currentVisibility: boolean) => {
    
    
    updateSkill(
      { id, updates:{visible: !currentVisibility} },
      {
        onSuccess: () => {
          toast.success("Visibility updated successfully");
        },
        onError: () => {
          toast.error("Failed to update visibility");
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteSkill(id, {
      onSuccess: () => {
        toast.success("Skill deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete skill");
      },
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Skills</CardTitle>
              <CardDescription>
                Manage your skills and proficiency levels
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full max-w-md">
                <Input
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Icon</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Proficiency</TableHead>
                  <TableHead className="w-[120px]">Visibility</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading skills...
                    </TableCell>
                  </TableRow>
                ) : filteredSkills.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No skills found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSkills.map((skill: ISkill) => (
                    <TableRow key={skill._id}>
                      <TableCell>
                        <div className="relative h-10 w-10">
                          <Image
                            src={skill.iconURL}
                            alt={skill.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{skill.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={skill.percentage} className="h-2 w-[200px]" />
                          <span className="text-sm text-muted-foreground">
                            {skill.percentage}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={skill.visible}
                            onCheckedChange={() => handleToggleVisibility(skill._id, skill.visible)}
                          />
                          {skill.visible ? (
                            <Eye className="h-4 w-4 text-green-500" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedSkill(skill);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(skill._id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddSkillDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      {selectedSkill && (
        <EditSkillDialog
          isOpen={isEditDialogOpen}
          onClose={() => {setIsEditDialogOpen(false); setSelectedSkill(null)}}
          skill={selectedSkill}
        />
      )}
    </div>
  );
}