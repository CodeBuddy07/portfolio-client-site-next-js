"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import Image from "next/image";
import { useAdminSkills } from "@/Tanstack/Skills/useAdminSkills";
import { useUpdateSkill } from "@/Tanstack/Skills/useUpdateSkill";
import { useDeleteSkill } from "@/Tanstack/Skills/useDeleteSkill";
import { AddSkillDialog } from "./_components/AddSkillDialog";
import { EditSkillDialog } from "./_components/EditSkillDialog";
import { ISkill } from "@/app/api/_models/SkillModel";

const PAGE_SIZE = 10;

export default function SkillsDashboard() {
  const [isAddDialogOpen, setIsAddDialogOpen]   = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSkill, setSelectedSkill]       = useState<ISkill | null>(null);
  const [searchQuery, setSearchQuery]           = useState("");
  const [currentPage, setCurrentPage]           = useState(1);

  const { data: skills, isLoading } = useAdminSkills();
  const { mutate: updateSkill }     = useUpdateSkill();
  const { mutate: deleteSkill }     = useDeleteSkill();

  // ── filter ────────────────────────────────────────────────────────────────
  const filteredSkills: ISkill[] =
    skills?.filter((skill: ISkill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // reset to page 1 whenever search changes
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // ── pagination ────────────────────────────────────────────────────────────
  const totalPages    = Math.max(1, Math.ceil(filteredSkills.length / PAGE_SIZE));
  const safePage      = Math.min(currentPage, totalPages);
  const startIdx      = (safePage - 1) * PAGE_SIZE;
  const pagedSkills   = filteredSkills.slice(startIdx, startIdx + PAGE_SIZE);
  const showingFrom   = filteredSkills.length === 0 ? 0 : startIdx + 1;
  const showingTo     = Math.min(startIdx + PAGE_SIZE, filteredSkills.length);

  // ── actions ───────────────────────────────────────────────────────────────
  const handleToggleVisibility = (id: string, currentVisibility: boolean) => {
    updateSkill(
      { id, updates: { visible: !currentVisibility } },
      {
        onSuccess: () => toast.success("Visibility updated"),
        onError:   () => toast.error("Failed to update visibility"),
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteSkill(id, {
      onSuccess: () => {
        toast.success("Skill deleted");
        // if we deleted the last item on a page, step back
        if (pagedSkills.length === 1 && safePage > 1) {
          setCurrentPage((p) => p - 1);
        }
      },
      onError: () => toast.error("Failed to delete skill"),
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
                Manage your tech stack — icon, brand color and display order
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full max-w-md">
                <Input
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
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
                  <TableHead className="w-[60px]">Icon</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-[140px]">Color</TableHead>
                  <TableHead className="w-[80px]">Order</TableHead>
                  <TableHead className="w-[120px]">Visibility</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  // ── skeleton rows ──────────────────────────────────────────
                  Array.from({ length: PAGE_SIZE }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 6 }).map((__, j) => (
                        <TableCell key={j}>
                          <div className="h-4 bg-muted rounded animate-pulse w-full max-w-[120px]" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : pagedSkills.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No skills found
                    </TableCell>
                  </TableRow>
                ) : (
                  pagedSkills.map((skill: ISkill) => (
                    <TableRow key={skill._id}>
                      {/* Icon */}
                      <TableCell>
                        <div className="relative h-10 w-10">
                          <Image
                            src={skill.iconURL}
                            alt={skill.name}
                            fill
                            unoptimized
                            className="object-contain"
                          />
                        </div>
                      </TableCell>

                      {/* Name */}
                      <TableCell className="font-medium">{skill.name}</TableCell>

                      {/* Color swatch + hex */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-block w-5 h-5 rounded-full border border-white/10 flex-shrink-0"
                            style={{
                              background: skill.color,
                              boxShadow: `0 0 6px ${skill.color}88`,
                            }}
                          />
                          <span className="text-xs text-muted-foreground font-mono">
                            {skill.color}
                          </span>
                        </div>
                      </TableCell>

                      {/* Order */}
                      <TableCell>
                        <span className="text-sm text-muted-foreground font-mono">
                          #{skill.order}
                        </span>
                      </TableCell>

                      {/* Visibility */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={skill.visible}
                            onCheckedChange={() =>
                              handleToggleVisibility(skill._id, skill.visible)
                            }
                          />
                          {skill.visible ? (
                            <Eye className="h-4 w-4 text-green-500" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          )}
                        </div>
                      </TableCell>

                      {/* Actions */}
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

        {/* ── Pagination footer ─────────────────────────────────────────────── */}
        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          {/* Showing X–Y of Z */}
          <p className="text-sm text-muted-foreground">
            {filteredSkills.length === 0
              ? "No results"
              : `Showing ${showingFrom}–${showingTo} of ${filteredSkills.length} skill${filteredSkills.length !== 1 ? "s" : ""}`}
          </p>

          {/* Page controls */}
          <div className="flex items-center gap-1">
            {/* Prev */}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page number pills */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // show first, last, current ±1, and ellipsis otherwise
              const show =
                page === 1 ||
                page === totalPages ||
                Math.abs(page - safePage) <= 1;

              const isEllipsisBefore =
                page === safePage - 2 && safePage - 2 > 1;
              const isEllipsisAfter =
                page === safePage + 2 && safePage + 2 < totalPages;

              if (isEllipsisBefore || isEllipsisAfter) {
                return (
                  <span key={page} className="px-1 text-muted-foreground text-sm">
                    …
                  </span>
                );
              }

              if (!show) return null;

              return (
                <Button
                  key={page}
                  variant={safePage === page ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8 text-sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}

            {/* Next */}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <AddSkillDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      {selectedSkill && (
        <EditSkillDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedSkill(null);
          }}
          skill={selectedSkill}
        />
      )}
    </div>
  );
}