"use client";

import { useState } from "react";
import { Search, Archive, Trash2, RefreshCw, MailOpen, Filter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { useEmails } from "@/Tanstack/Emails/useEmails";
import { useUpdateEmail } from "@/Tanstack/Emails/useUpdateEmail";
import { useDeleteEmail } from "@/Tanstack/Emails/useDeleteEmail";
import { IEmail } from "@/app/api/_models/EmailModel";
import { cn } from "@/lib/utils";

interface Email {
  _id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  createdAt: string;
}

export default function EmailDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    isRead: undefined as boolean | undefined,
    isArchived: undefined as boolean | undefined,
  });

  const itemsPerPage = 10;

  const { data, isLoading, refetch, isRefetching } = useEmails({
    search: searchQuery,
    page: currentPage,
    limit: itemsPerPage,
    ...filters
  });

  

  const { mutate: updateEmail } = useUpdateEmail();
  const { mutate: deleteEmail } = useDeleteEmail();

  const emails = data?.emails || [];
  const totalPages = data?.pagination?.pages || 1;

  const toggleSelectEmail = (id: string) => {
    setSelectedEmails(prev =>
      prev.includes(id)
        ? prev.filter(emailId => emailId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map((email: IEmail) => email._id));
    }
  };

  const handleMarkAs = (status: 'read' | 'unread' | 'archived' | 'unarchived') => {
    selectedEmails.forEach(id => {
      updateEmail({
        id,
        isRead: status === 'read' ? true : status === 'unread' ? false : undefined,
        isArchived: status === 'archived' ? true : status === 'unarchived' ? false : undefined
      });
    });
    setSelectedEmails([]);
  };

  const handleDelete = () => {
    selectedEmails.forEach(id => {
      deleteEmail(id, {
        onSuccess: () => toast.success("Email deleted successfully"),
        onError: () => toast.error("Failed to delete email")
      });
    });
    setSelectedEmails([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Email Inbox</CardTitle>
              <CardDescription>
                Manage all contact form submissions
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                <RefreshCw
                  className={cn(
                    "h-4 w-4 mr-2 transition-transform",
                    isRefetching && "animate-spin"
                  )}
                />
                Refresh
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilters({ isRead: undefined, isArchived: undefined })}>
                    All Emails
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilters(() => ({  isRead: false, isArchived: undefined }))}>
                    Unread Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilters(() => ({ isRead: undefined, isArchived: true }))}>
                    Archived Only
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search emails..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {selectedEmails.length > 0 && (
            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMarkAs('read')}
              >
                <MailOpen className="h-4 w-4 mr-2" />
                Mark as Read
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMarkAs('archived')}
              >
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedEmails.length === emails.length && emails.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="w-[150px]">Date</TableHead>
                  <TableHead className="w-[40px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading emails...
                    </TableCell>
                  </TableRow>
                ) : emails.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No emails found
                    </TableCell>
                  </TableRow>
                ) : (
                  emails.map((email: Email) => (
                    <TableRow
                      key={email._id}
                      className={!email.isRead ? "bg-secondary/50" : ""}
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedEmails.includes(email._id)}
                          onCheckedChange={() => toggleSelectEmail(email._id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{email.name}</div>
                        <div className="text-sm text-muted-foreground">{email.email}</div>
                      </TableCell>
                      <TableCell>
                        <div className="line-clamp-2">{email.message}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Badge variant={email.isRead ? "outline" : "default"}>
                            {email.isRead ? "Read" : "Unread"}
                          </Badge>
                          {email.isArchived && (
                            <Badge variant="secondary">Archived</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {format(new Date(email.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            updateEmail({ id: email._id, isRead: !email.isRead });
                          }}
                        >
                          {email.isRead ? (
                            <MailOpen className="h-4 w-4 text-green-500" />
                          ) : (
                            <Mail className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


