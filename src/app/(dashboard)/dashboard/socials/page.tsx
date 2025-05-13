"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useSocialLinks } from "@/Tanstack/SocialLinks/useSocialLinks";
import { useUpdateSocialLink } from "@/Tanstack/SocialLinks/useUpdateSocialLink";
import { useDeleteSocialLink } from "@/Tanstack/SocialLinks/useDeleteSocialLink";
import { AddSocialLinkDialog } from "./_components/AddSocailLinkDialog";
import { EditSocialLinkDialog } from "./_components/EditSocialLinkDialog";


interface ISocialLink {
  _id: string;
  platform: string;
  url: string;
  visible: boolean;
}

export default function SocialLinksDashboard() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<ISocialLink | null>(null);

  const { data: socialLinks, isLoading } = useSocialLinks(true);
  const { mutate: updateLink } = useUpdateSocialLink();
  const { mutate: deleteLink } = useDeleteSocialLink();

  const handleToggleVisibility = (id: string, currentVisibility: boolean) => {
    updateLink(
      { id, update: { visible: !currentVisibility } },
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
    deleteLink(id, {
      onSuccess: () => {
        toast.success("Social link deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete social link");
      },
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>
                Manage your social media links and their visibility
              </CardDescription>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Social Link
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Platform</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="w-[120px]">Visibility</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      Loading social links...
                    </TableCell>
                  </TableRow>
                ) : socialLinks?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No social links found
                    </TableCell>
                  </TableRow>
                ) : (
                  socialLinks?.map((link: ISocialLink) => (
                    <TableRow key={link._id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <Link2 className="h-4 w-4" />
                        {link.platform}
                      </TableCell>
                      <TableCell>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {link.url}
                        </a>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={link.visible}
                            onCheckedChange={() => handleToggleVisibility(link._id, link.visible)}
                          />
                          {link.visible ? (
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
                              setSelectedLink(link);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(link._id)}
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

      <AddSocialLinkDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      {selectedLink && (
        <EditSocialLinkDialog
          isOpen={isEditDialogOpen}
          onClose={() => {setIsEditDialogOpen(false); setSelectedLink(null)}}
          socialLink={selectedLink}
        />
      )}
    </div>
  );
}